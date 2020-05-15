const FLAG = "O";
const EMPTY = " ";
const MINIMUM_SAFE_FIELD = 9;
const ROW_DEFAULT = 30;
const COL_DEFAULT = 30;
const MINE_DEFAULT = 30;

let safe_field_count = 0;
let mines_list = [];
let flags_list = [];
let initialized = false;

function init() {
    let first_row = ROW_DEFAULT - 1;
    let first_col = COL_DEFAULT - 1;
    let first_mine = MINE_DEFAULT;
    let col_add_button = document.getElementById("col+");
    let col_del_button = document.getElementById("col-");
    let row_add_button = document.getElementById("row+");
    let row_del_button = document.getElementById("row-");
    let mine_add_button = document.getElementById("mine+");
    let mine_del_button = document.getElementById("mine-");
    let first_switch = get_first_row().firstElementChild.firstElementChild;

    set_button_events(first_switch);
    col_add_button.addEventListener("click", add_column);
    col_del_button.addEventListener("click", del_column);
    row_add_button.addEventListener("click", add_row);
    row_del_button.addEventListener("click", del_row);
    mine_add_button.addEventListener("click", mine_add);
    mine_del_button.addEventListener("click", mine_del);

    // 行と列の余り修正
    get_row_count_element().value = 1;
    get_col_count_element().value = 1;

    while (first_row--) row_add_button.click();
    while (first_col--) col_add_button.click();
    while (first_mine--) mine_add_button.click();
}

function get_first_row() {
    return get_table().firstElementChild;
}

function get_table() {
    return document.getElementById("table_body").firstElementChild;
}

function get_row_count_element() {
    return document.getElementById("row_count")
}

function get_col_count_element() {
    return document.getElementById("col_count");
}

function get_mine_count_element() {
    return document.getElementById("mine_count");
}

function get_row_count() {
    return get_row_count_element().value;
}

function get_col_count() {
    return get_col_count_element().value;
}

function get_mine_count() {
    return get_mine_count_element().value;
}

function set_button_events(button) {
    button.addEventListener("click", field_click);
    button.addEventListener("contextmenu", field_flag);

    button.value = EMPTY;
    button.classList.add("field");
}

function create_cell() {
    let input_elm = document.createElement("input");
    let cell = document.createElement("td");
    input_elm.type = "button";
    set_button_events(input_elm);
    cell.appendChild(input_elm);
    return cell;
}

function add_row() {
    let head_row = get_first_row();
    let column_count = head_row.childElementCount;
    let appending_row = document.createElement("tr");

    while (column_count--) {
        appending_row.appendChild(create_cell());
    }

    head_row.parentNode.insertBefore(appending_row, head_row);
    get_row_count_element().value++;
}

function del_row() {
    let remove_row = get_first_row();
    if (remove_row.parentElement.childElementCount <= 1) return;
    remove_row.parentNode.removeChild(remove_row);
    get_row_count_element().value--;
}

function add_column() {
    let row = get_first_row();

    while (row) {
        row.insertBefore(create_cell(), row.children[0]);
        row = row.nextElementSibling;
    }
    get_col_count_element().value++;
}

function del_column() {
    let row = get_first_row();
    // #3
    if (row.children.length <= 1) return;

    while (row) {
        row.removeChild(row.children[0]);
        row = row.nextElementSibling;
    }
    get_col_count_element().value--;
}

function mine_add() {
    if (get_mine_count() >= get_row_count() * get_col_count() - MINIMUM_SAFE_FIELD) return;
    get_mine_count_element().value++;
}

function mine_del() {
    // #3
    let mines = get_mine_count_element().value;
    if (mines < 1) return;

    get_mine_count_element().value--;
}

function field_click() {
    if (!initialized) {
        initialized = true;
        init_field(this);
    }
    if(this.value === FLAG) return;

    if (this.is_mine) {
        alert("kaboom");
        open_mines();
    }

    let around_buttons = get_around_buttons(this);
    let around_bombs = 0;

    this.classList.add("open");
    this.setAttribute("disabled", "");

    for (let i of around_buttons) {
        if (i.is_mine) around_bombs++;
    }
    if (around_bombs) {
        this.value = around_bombs;
    } else {
        for (let i of around_buttons) {
            i.click();
        }
    }
    safe_field_count--;
    if (!safe_field_count) {
        open_mines();
        alert("WON!!!");
    }
}

function field_flag() {
    if (!initialized) return;

    if (this.value == EMPTY) {
        this.value = FLAG;
        this.classList.add("flag");
        flags_list.push(this);
    } else if (this.value == FLAG) {
        this.value = EMPTY;
        this.classList.remove("flag");
        flags_list.splice(flags_list.indexOf(this), 1);
    }
    document.getElementById("flag_count").value = flags_list.length;

    return;
}

function init_field(button) {
    let items_list = [];
    let rows = get_row_count();
    let columns = get_col_count();
    let mines = get_mine_count();
    let table = get_table();
    let cell = button.parentElement;
    let line = cell.parentElement;
    let column_pos = get_position(cell);
    let row_pos = get_position(line);
    safe_field_count = rows * columns - mines;

    if (safe_field_count < MINIMUM_SAFE_FIELD) {
        alert("too many mines of field size");
        return;
    }

    for (let items of document.getElementById("panel").children) {
        items.setAttribute("disabled", "");
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (Math.abs(column_pos - c) > 1 || Math.abs(row_pos - r) > 1) {
                items_list.push([r, c]);
            }
        }
    }

    for (let i = items_list.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = items_list[i];
        items_list[i] = items_list[j];
        items_list[j] = tmp;
    }

    for (let i = 0; i < mines; i++) {
        let mine_pos = items_list[i];
        let mine_button = table.children[mine_pos[0]].children[mine_pos[1]].firstElementChild;
        mine_button.is_mine = true;
        mines_list.push(mine_button);
    }
}

function get_around_buttons(button) {
    let cell = button.parentElement;
    let line = cell.parentElement;
    let table = get_table();
    let column_pos = get_position(cell);
    let row_pos = get_position(line);
    let around_buttons = [];

    let colLength = table.rows[0].cells.length;
    let rowLength = table.rows.length;

    for (let r = -1; r < 2; r++) {
        for (let c = -1; c < 2; c++) {
            // 範囲超えないように条件
            let rowIdx = row_pos + r;
            let colIdx = column_pos + c;

            if (rowIdx >= 0 && rowIdx < rowLength && colIdx >= 0 && colIdx < colLength) {
                let a = table.children[rowIdx].children[colIdx];
                around_buttons.push(a.firstElementChild);
            }
        }
    }

    return around_buttons;
}

function get_position(col) {
    let column_pos = 0;
    while (col) {
        col = col.previousElementSibling;
        column_pos++;
    }
    return column_pos - 1;  // 0から
}

function open_mines() {
    for (let flag of flags_list) {
        if (!flag.is_mine) flag.classList.add("wrong");
    }
    for (let mine of mines_list) {
        mine.value = "X";
        mine.classList.add("mine")
    }
    for (let line of get_table().children)
        for (let cell of line.children) {
            cell.firstElementChild.setAttribute("disabled", "");
        }
}

// #1
window.addEventListener("load", function () {
    init();
    document.body.addEventListener('contextmenu', function (e) { e.preventDefault();}, false);
});
