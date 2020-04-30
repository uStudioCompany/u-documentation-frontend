import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import LibDrawer from 'ustudio-ui/components/Drawer';

const Aside = styled(Flex)`
  width: 320px;
  min-height: 100%;

  padding: var(--i-regular);

  border-right: 1px solid var(--c-light);
  border-radius: 0;

  overflow: scroll;
  z-index: var(--l-top);

  background-color: var(--c-lightest);
  color: var(--c-darkest);
`;

const Drawer = styled(LibDrawer)`
  width: 320px;

  flex-direction: column;

  padding: var(--i-large);
`;

export default { Aside, Drawer };
