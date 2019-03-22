export const IS_FETCHING_ORDERS = "IS_FETCHING_ORDERS";
export const SUCCESS_FETCHING_ORDERS = "SUCCESS_FETCHING_ORDERS";
export const ERROR_FETCHING_ORDERS = "ERROR_FETCHING_ORDERS";



export function successFetchingOrders(orders) {
	return { type: SUCCESS_FETCHING_ORDERS, payload: orders };
}

export function errorFetchingOrders() {
	return { type: ERROR_FETCHING_ORDERS };
}

export function isFetchingOrders(fetching) {
	return { type: IS_FETCHING_ORDERS, payload: fetching };
}

export function fetchOrders() {
	return (dispatch) => {
		// let redux know we're starting to fetch the orders
		dispatch(isFetchingOrders(true));

		fetch("http://129.161.139.153:8080/orders").then((response) => {	// actually fetching the order data from the api
			return response.json();
		}).then((response) => {			// if the api call is a success
			dispatch(successFetchingOrders(response));
			dispatch(isFetchingOrders(false));
		}).catch(() => {				// catches if the api call errors
			dispatch(isFetchingOrders(false));
			dispatch(errorFetchingOrders());
		});
	}
}