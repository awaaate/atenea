import { UserComponents } from "../../user-components";

import { Element, Frame } from "@craftjs/core";

const DefaultFrame = () => {
  return (
    <Frame>
      <UserComponents.Grid>
        <UserComponents.Text
          layout={{
            w: 12,
            h: 4,
            x: 0,
            y: 0,
          }}
        />
        <UserComponents.ProposalBudgetWidget
          layout={{
            w: 6,
            h: 10,
            x: 0,
            y: 2,
          }}
        />
      </UserComponents.Grid>
    </Frame>
  );
};

export { DefaultFrame };
