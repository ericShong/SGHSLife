	var submit = document.getElementById('submit');
			var phone = document.getElementById('phone');
			var fname = document.getElementById('fname');
			var lname = document.getElementById('lname');
			var email = document.getElementById('email');
			var result = document.getElementById('result')
			var role = document.getElementById('role');
			submit.onclick = function(ev){
				correct = true;
				if (/^[\w.]+@[\w]+\.[\w]+$/.test(email.value) == false){
					red(email); correct = false;
				} else{normal(email)}
				if(/^[\d]{10}$/.test(phone.value) == false){
					red(phone); correct = false;
				} else{normal(phone)}
				if (/^[\w]+$/.test(fname.value)==false){
					red(fname);correct = false;
				} else{normal(fname)}
				if (/^[\w]+$/.test(lname.value)==false){
					red(lname);correct = false;
				} else{normal(lname)}
				if (role.value==""){
					red(role); correct = false;
				} else{normal(role)}
				if(correct){
					fname.value = capitalize(fname.value)	
					lname.value = capitalize(lname.value)	
					var req = new XMLHttpRequest();
					req.open("POST", '/', true);
					req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					fullname=fname.value + "%20" + lname.value;
					phone.value = '(' + phone.value.slice(0,3) + ') ' + phone.value.slice(3,6) + '-' + phone.value.slice(6)
					req.send("name="+fullname+'&phone='+phone.value+'&email='+email.value+'&role='+role.value);
					result.innerText = "Submitted: " + fname.value + " " + lname.value + ", " + phone.value + ", " + email.value;
					result.classList.add('fade');
					setTimeout(function(){
							result.innerText = ""
							result.classList.remove('fade');}, 5000)
					document.getElementById('form').reset();
					ev.preventDefault();
					console.log('correct');
				}
			}
		function capitalize(s){
			return s.charAt(0).toUpperCase() + s.slice(1);
		}
		function red(e){
			e.style.outline = '1px solid red';
		}
		function normal(e){
			e.style.outline = "";
		}