import React, { useState } from 'react';

type ITabs<P = unknown> = React.FC<P> & {
  Tab: typeof Tab;
};

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({});

interface ITabsProps {
  children: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
  children: React.ReactNode;
}

const Tab: React.FC<ITabProps> = props => {
  return (
    <TabsContext.Consumer>
      {context => {
        if (
          !context.activeName &&
          props.initialActive &&
          context.handleTabClick
        ) {
          setTimeout(context.handleTabClick, 0, props.name, props.children);
          return null;
        }

        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : '';

        return (
          <li
            onClick={() => context.handleTabClick?.(props.name, props.children)}
            className={props.name === activeName ? 'active' : ''}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );
};

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

const Tabs: ITabs<ITabsProps> = props => {
  const [state, setState] = useState<IState | null>(null);
  const ctx: ITabsContext = {
    activeName: state?.activeName,
    handleTabClick: (name: string, content: React.ReactNode) => {
      setState({ activeName: name, activeContent: content });
    },
  };
  return (
    <TabsContext.Provider value={ctx}>
      <ul className="tabs">{props.children}</ul>
      <div>{state?.activeContent}</div>
    </TabsContext.Provider>
  );
};

Tabs.Tab = Tab;

export default Tabs;
