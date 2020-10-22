## Metric Logger API

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

		body:
		```
		{
		status: error
		message: Key not found
		}
		```
