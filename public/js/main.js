// setInterval(function(){ mapData(); }, 3000)


async function getData() {
    let current = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    let products = await fetch('/get-btc-price');
    
    current = await current.json();
    products = await products.json();
    return {current, products};
}
// function myFunction() {
//    alert("Dữ liệu đã được lưu");
// }


async function mapData(){
    const {current, products} = await getData();
    const h2 = document.getElementById('btc');
    h2.innerHTML = `
        <tr>
            <th>Giá hiện tại :</th>
        </tr>
        <tr>
            <th>${current.data.amount}${current.data.currency}</th>
        </tr>`;

        

    const table = document.getElementById('bang');

        const thead = `
            <tr>
            <th>Coin</th>
            <th>Giá hiện tại</th>
            <th>Cài đặt giá</th>
            <th>Trong khoảng</th>
            <th>Thong báo tới</th>
            <th>Chỉnh sửa/xóa</th>
            </tr>`;

        let tbody = '';
        products.forEach((product) => {
            tbody += `
                <tr style="text-align: center;">
                <td>${product['coinType']}</td>
                <td>${current.data.amount}${current.data.currency}</td>
                <td>${product["increase/decrease"] === "increase" ? "Tăng" : "Giảm"} ${product.number}</td>
                <td>${product['hour']}m</td>
                <td>${product['Telename']}</td>
                <td>
                    <button type="button" class="btn-edit">Sửa</button>
                    <button type="button" class="btn-delete">Xóa</button>
                </td>
                </tr>`
        });

    table.innerHTML = thead + tbody;
    const [...btnEdits] = document.querySelectorAll('table .btn-edit');
    const [...btnDeletes] = document.querySelectorAll('table .btn-delete');

    btnEdits.forEach((btnEdit) => {
        btnEdit.onclick = function() {
            
        }
    })
    btnDeletes.forEach((btnDelete) => {
        btnDelete.onclick = function() {
            console.log('delete')
        }
    })
}



window.onload = mapData