import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

const Content = styled(Flex)`
  margin-top: 4rem;
`;

const ErrorStatus = styled(Text)`
  ${Mixin.Font.h1()};

  font-size: 6rem;
`;

export default { Content, ErrorStatus };
