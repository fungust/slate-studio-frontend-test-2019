# State management
This library simply remembers the application across react components and modules in the 'data' property.

# Event channel methods
## subscribe(channel, callback)
Subscribes to a given channel. Callback is called when a publish event is received on the specified channel. Callback is supplied with the data that is published. Returns an identifier (integer) that must be specified in order to unsubscribe from the channel.

## unsubscribe(channel, identifier)
Unsubscribes from a given channel. The channel name and the identifier obtained when subscribing must be supplied.

## publish(channel, data)
Publishes the supplied data to the specified channel. All callbacks subscribing to this channel will receive the supplied data as in input argument.