const inputDollar = document.getElementById("input-dollar");
const divResult = document.getElementById("result");
const totalCents = document.getElementById("total-cents");
const KEY_CODE_ENTER = 13;
const DOLLAR_PATTERN = /^\d+[\.,]?\d{0,2}$/;


inputDollar.addEventListener("keydown", (event) => {
    // Key donwn Enter
    if (event.keyCode == KEY_CODE_ENTER) {
        onConvert();
    }
});


function onConvert() {
    // clear result
    let old_table = document.getElementById("table-coins");
    totalCents.innerHTML = "";
    if (old_table != null) {
        divResult.removeChild(old_table);
    }
    if (inputDollar.value == "") {
        alert("Empty number field");
        return;
    }
    if (!DOLLAR_PATTERN.test(inputDollar.value)) {
        alert("Invalid dollar value");
        return;
    }
    let cents = parseFloat(inputDollar.value) * 100;
    console.log(dollarsToCents(cents));

    let new_table = buildTable(dollarsToCents(cents));
    totalCents.innerHTML = "Total cents: " + cents;
    divResult.appendChild(new_table);

}


function dollarsToCents(cents) {
    let quarter = Math.floor(cents / 25);
    let dime = Math.floor((cents % 25) / 10);
    let nicket = Math.floor(((cents % 25) % 10) / 5);
    let penny = Math.floor(((cents % 25) % 10) % 5);
    return { "quarter": quarter, "dime": dime, "nicket": nicket, "penny": penny };
}


function buildTable(coins) {
    let table = document.createElement("table");
    table.setAttribute("id", "table-coins");
    let table_line = `
            <tr>
                <th>Coins</th>
                <th>Count</th>
            </tr>
            <tr>
                <td>Quarter</td>
                <td>${coins["quarter"]}</td>
            </tr>
            <tr>
                <td>Dime</td>
                <td>${coins["dime"]}</td>
            </tr>
            <tr>
                <td>Nicket</td>
                <td>${coins["nicket"]}</td>
            </tr>
            <tr>
                <td>Penny</td>
                <td>${coins["penny"]}</td>
            </tr>  
    `;
    table.insertAdjacentHTML("beforeend", table_line);
    return table;
}