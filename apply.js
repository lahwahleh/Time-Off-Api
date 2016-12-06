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

	// to post data into the application table
	router.post("/application", function(req, res){
		var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
		var table = ["application", "user_dept", "user_leaveType", "user_relName", "user_relEmail", "user_LeaveDays", "user_startDate", "user_endDate", "user_reason", "user_uId", "user_Uname", "user_leavebalance", "user_useremail",req.body.dept,req.body.leaveType,req.body.relName,req.body.relEmail,req.body.LeaveDays,req.body.startDate,req.body.endDate,req.body.reason,req.body.uId,req.body.Uname,req.body.leavebalance,req.body.useremail];
		query = mysql.format(query,table);
		connection.query(query, function(err, rows){
			if(err) {
				console.log(err);
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Form Submitted Successfully !"});
			}
		});
	});

	// to get data from the application table
	router.get("/application", function(req, res){
		var query = "SELECT * FROM ??";
		var table = ["application"];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows){
			if (err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Success", "application" : rows});
			}
		});
	});



	router.put("/application",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["application","user_status",req.body.status,"user_relEmail",req.body.relEmail];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.relEmail});
            }
        });
    });

	 router.get("/application/:user_status",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["application","user_status",req.params.user_status];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "users" : rows});
            }
        });
    });

}

module.exports = REST_ROUTER;