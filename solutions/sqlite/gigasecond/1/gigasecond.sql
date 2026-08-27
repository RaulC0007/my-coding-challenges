UPDATE gigasecond 
SET result = strftime(
    '%Y-%m-%dT%H:%M:%S',
    datetime(moment, '+1000000000 seconds')
);