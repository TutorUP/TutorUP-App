// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: id => ({
    subject: 'TutorUP Email Confirmation',
    html: `
      <style>
      	p, a {
      		text-decoration: none;
      		color: #FFFFFF;
      		background-color: #5E9CAE;
            border-radius: 10px;
            border: 3px solid #5E9CAE;
      		padding: 10px;
      		font-weight: 400;
      		margin: auto;
            text-transform: uppercase;
            text-align: center;
            font-family: "Roboto", Helvetica, Veranda, sans-serif;

      	}
        p:hover, a:hover {
        	background-color: #97bece;
            border: 3px solid #97bece;
        }
        h1 {
        	font-family: "Roboto", Helvetica, Veranda, sans-serif;
            text-align: center;
            border-bottom: 5px solid #1E1656;
            padding-bottom: 5px;
            color: #494949;
        }
        div {
        	margin: auto;
  			width: 75%;
  			padding: 10px;
		}        
      </style>
      <div>
			<h1>Welcome to TutorUP!</h1>
			<p>
		    	<a href='http://localhost:3000/confirm/${id}'>
		        	click to confirm email
		    	</a>
			</p>
	  </div>
    `,      
    text: `Copy and paste this link: http://localhost:3000/confirm/${id}`
  })
  
}

