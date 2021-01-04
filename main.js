// browser.browserAction.onClicked.addListener(function() {
// 	alert("Hi click!");
// });

function order(a, b) {
	// console.log(a);
	// console.log(b);
	let link = "http://localhost/signal.php?symbol="+a+"&value="+b;
	// alert(link);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			// console.log(this.responseText);
			alert("سفارش خرید "+a+ " با قیمت "+ b+" ارسال شد."+"\n\n"+this.responseText);
		}
		else {
			// alert(link + "\n"+this.readyState+"\n"+this.status);
		}
	};
	xhttp.open("GET", link, true);
	xhttp.send();
}

document.body.style.border = "25px solid yellow";
var elem = document.createElement('div');
elem.style.cssText = 'width:200px;z-index:999999;height:auto;position:fixed;left: 20px;bottom:20px; background:yellow; border:3px solid black;padding:7px;';
elem.innerHTML="<button style='width:100%;' id='adds-ins-button-send'>ارسال سفارش خرید</button>"
document.body.appendChild(elem);
// alert("hi");
let btn = document.querySelector("#adds-ins-button-send");
btn.addEventListener('click', function() {
	// alert("Click!");
	let items = document.querySelectorAll("#main .t0c.t0c1:nth-child(1)");
	if(items) {
		if(confirm('آیا مطمئن هستید میخواهید سفارش خرید برای '+ items.length + ' تا سهم ارسال کنید؟')) {
			let orders = [];
			items.forEach(function(item) {
				let a = item.textContent;
				let b= item.parentElement.querySelector("div:nth-child(8)").textContent;
				if(a && b) {
					b = b.replace(",", "");
					orders.push([a, b]);
				}
			});
			let question = orders.map(function(order) {
				return order[0] + " ( "+order[1]+" )\n";
			});
			if(confirm('اسامی سهم های مورد نظر شما:'+"\n"+question)) {
				// alert("ok");
				// alert(orders.length);
				for(let i=0;i < orders.length;i++) {
					order(orders[i][0], orders[i][1]);
				}
				// orders.forEach(function(order) {
				// 	order(order[0], order[1]); // Why not works?
				// });
				alert('سفارش ها ارسال شدند.');
			} else {
				alert('کنسل شد');
			}
		} else {
			alert('کنسل شد');
		}
	}
}, false);
