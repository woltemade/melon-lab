import getOrder from "../calls/getOrder";

const onOrderUpdate = async ({ id }) => getOrder(id.toNumber());

export default onOrderUpdate;
