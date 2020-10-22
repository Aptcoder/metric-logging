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

	* Response Body 
	{}

* `GET` /api/metric/:key/sum

 	Users can get sum of logged metrics in the last one hour 
	
	 * URL parameters 
	 	|    Name| required| detail| type
		 -------|----------|----------|----
		 |    key | yes | key name under which metrics should be logged| String

	 * Response Body 
	 
	     |  Name |  detail| type 
	    --------|----------|--------------
	    | value  | sum of metrics from last two hours| Integer
