import { SAVE_NEIGHBOUR_NODES, REQ_SAVE_NODE, REC_SAVE_NODE } from './node.actions';

export default function node(state = {}, action) {
  switch (action.type) {
    case REQ_SAVE_NODE:
      return {
        ...state,
        savingNode: true,
      };
    case REC_SAVE_NODE:
      return {
        ...state,
        savingNode: false,
      };
    case SAVE_NEIGHBOUR_NODES:
      return {
        ...state,
        nearByNodes: action.nodes,
      };
    default:
      return state;
  }
}
