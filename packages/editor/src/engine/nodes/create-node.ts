import React from 'react';

import { Node, FreshNode, UserComponentConfig } from '../interfaces';


import { NodeProvider } from './node-context';
import { nanoid } from 'nanoid';

const getNodeTypeName = (type: string | { name: string }) =>
    typeof type == 'string' ? type : type.name;

export function createNode(
    newNode: FreshNode,
    normalize?: (node: Node) => void
) {
    let actualType = newNode.data.type as any;
    let id = newNode.id || nanoid();

    const node: Node = {
        id,
        _hydrationTimestamp: Date.now(),
        data: {
            type: actualType,
            name: getNodeTypeName(actualType),
            displayName: getNodeTypeName(actualType),
            props: {},
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {},
            ...newNode.data,
        },
        related: {},
        events: {
            selected: false,
            dragged: false,
            hovered: false,
        },
        dom: null,
    };

    // @ts-ignore
    if (node.data.type === Element) {
        const mergedProps = {
            ...node.data.props,
        };

        node.data.props = mergedProps;
        actualType = node.data.type;
        node.data.name = getNodeTypeName(actualType);
        node.data.displayName = getNodeTypeName(actualType);


    }

    if (normalize) {
        normalize(node);
    }

    // TODO: use UserComponentConfig type
    const userComponentConfig = actualType.node as UserComponentConfig<any>;

    if (userComponentConfig) {
        node.data.displayName =
            userComponentConfig.displayName ||
            userComponentConfig.name ||
            node.data.displayName;

        node.data.props = {
            ...(userComponentConfig.props || userComponentConfig.defaultProps || {}),
            ...node.data.props,
        };





        if (userComponentConfig.related) {
            const relatedNodeContext = {
                id: node.id,
                related: true,
            };

            Object.keys(userComponentConfig.related).forEach((comp) => {
                node.related[comp] = (props) =>
                    React.createElement(
                        NodeProvider,
                        relatedNodeContext,
                        React.createElement(userComponentConfig.related[comp], props)
                    );
            });
        }
    }

    return node;
}