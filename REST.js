var mysql = require('mysql')

function REST_ROUTER(router, connection, md5){
	var self = this;
	//self.handleRoutes(router, connection, md5);
	self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5){
	
	router.get("/", function(req,res){
		res.json({"Message" : "Hello World !"});
	});

	// to post data into the biiodatas table
	router.post("/biodatas", function(req, res){
		var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
		var table = ["biodatas", "user_email", "user_password","user_phoneNumber", "user_employee_no", "user_firstname", "user_lastname", "user_dept", "user_leave_balance", "user_authtype",req.body.email,req.body.password,req.body.phoneNumber,req.body.employee_no,req.body.firstname, req.body.lastname, req.body.dept, req.body.leave_balance,req.body.authtype];
		query = mysql.format(query,table);
		connection.query(query, function(err, rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "User Added !"});
			}
		});
	});

	// to get data from the biodatas table
	router.get("/biodatas", function(req, res){
		var query = "SELECT * FROM ??";
		var table = ["biodatas"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows){
			if (err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Success", "biodatas" : rows});
			}
		});
	});


	 router.put("/biodatas/:user_email",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["biodatas","user_password",req.body.password,"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });


	 router.put("/biodatas",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["biodatas","user_leave_balance",req.body.leave_balance,"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the leave balance for email "+req.body.email});
            }
        });
    });

			router.delete("/biodatas/:user_email",function(req,res){
			        var query = "DELETE from ?? WHERE ??=?";
			        var table = ["biodatas","user_email",req.params.user_email];
			        query = mysql.format(query,table);
			        connection.query(query,function(err,rows){
			            if(err) {
			                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			            } else {
			                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.user_email});
			            }
			        });
			    });

}

module.exports = REST_ROUTER;