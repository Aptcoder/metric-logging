## Metric Logger API
Base URL: https://metric-logger-api.herokuapp.com/

*  `POST` /api/metric/:key/

	Users can log a metric using a key 
    * URL parameters 
		
		|    Name| required| detail| type
		 -------|----------|----------|----
		 |    key | yes | key name under which metrics should be logged| String

    * Request Body Parameters 
    
	    | Name |  required|  detail| type
	    --------|----------|--------|-------
	    | value | yes | metric value | Number

	* Sucsess Response 
	
	status: `200`
	
	body: {}
	
	* Error Response 
	
	status: 400
	
	body:
	```
	{
	status: error
	message: A valid numeric value is required
	}
	```

* `GET` /api/metric/:key/sum

 	Users can get sum of logged metrics in the last one hour 
	
	 * URL parameters 
	 	|    Name| required| detail| type
		 -------|----------|----------|----
		 |    key | yes | key name under which metrics should be logged| String

	 * Success Response
	 
		 status: `200` 
		 body:
		```
		{
		  value: [sum]
		}
		```

	* Error response
	
		status: 404
		This is a response when the key is not found. Note that only metrics in the last hour are stored so a key with
		no metrics from the last hour would also give this response.
		body:
		```
		{
		status: error
		message: Key not found
		}
		```
