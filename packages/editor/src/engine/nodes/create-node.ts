import React from 'react';

import { Node, FreshNode, UserComponentConfig } from '../interfaces';


import { NodeProvider } from './node-context';
import { nanoid } from 'nanoid';
import { WidgetProps } from '../../widget/widget-types';

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
            props: {} as any,
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {},
            ...newNode.data,
            type: actualType,
            name: getNodeTypeName(actualType),
            displayName: getNodeTypeName(actualType),
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
            title: node.data.props.title || "",

        };

        node.data.props = mergedProps;
        actualType = node.data.type;
        node.data.name = getNodeTypeName(actualType);
        node.data.displayName = getNodeTypeName(actualType);

        //check if layout it's defined

    }


    if (normalize) {
        normalize(node);
    }

    // TODO: use UserComponentConfig type
    const userComponentConfig = actualType.node as UserComponentConfig<any>;

    if (userComponentConfig) {
        node.data.displayName =
            userComponentConfig.displayName ||
            node.data.displayName;

        node.data.props = {
            ...(userComponentConfig.defaultProps || {}),
            ...node.data.props,

        } as WidgetProps;





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
                        React.createElement(userComponentConfig.related[comp] as any, props)
                    );
            });
        }
    }

    return node;
}