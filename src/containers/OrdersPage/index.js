import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { getOrders } from './selectors';

class OrdersPage extends Component {

	render() {
		let { classes, orders } = this.props;
		return (
			<div className={classes.root}>
				<div>
					<List className={classes.orderList} >
						{orders.map((order, index) => (
							<Fragment key={`${order.orderId}`} >
								<Link to={`/order/status/${order.orderId}`} className={classes.orderText}>
									<ListItem divider={index !== orders.length-1} >
										<ListItemAvatar>
                      <Avatar>
                        #{index+1}
                      </Avatar>
                    </ListItemAvatar>
										<ListItemText
											disableTypography
											primary={order.orderSummary.vendor}
											secondary={
												<div className={classes.subtextContainer}>
													<p>{order.orderSummary.location}</p>
													<p style={{ color: order.status === "CANCELLED" ? 'red' : 'green' }}>
														{order.status}
													</p>
												</div>
											}
										/>
									</ListItem>
								</Link>
							</Fragment>
							))}
					</List>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		orders: getOrders(state),
	};
}

const styles = {
	root: {
		backgroundColor: '#ccc',
		flexDirection: 'column',
		height: '100%',
	},
	orderList: {
		backgroundColor: '#fff',
	},
	orderText: {
		textDecorationLine: 'none',
	},
	subtextContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: '15px',
		color: 'grey',
	}
};

export default withStyles(styles)(
	connect(mapStateToProps)(OrdersPage)
);