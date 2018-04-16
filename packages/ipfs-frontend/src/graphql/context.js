import { makeContext } from '@melonproject/graphql-schema';
import pubsub from './pubsub';

export default makeContext(pubsub);
