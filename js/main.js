//global


var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage(mangNV) {
    localStorage.setItem("DSNV", JSON.stringify(mangNV));
}

function getLocalStorage(mangNV) {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }

}
getLocalStorage();

function layThongTinNV() {
    var taiKhoanNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var date = getELE("datepicker").value;
    var salary = getELE("luongCB").value;
    var position = getELE("chucvu").value;
    var hours = getELE("gioLam").value;

    var isValid = true;


    // Kiểm tra tài khoảng NV không được trùng và không được để trống

    isValid &= validation.checkEmpty(taiKhoanNV, "Tài khoản NV không được để trống", "tbTKNV") && validation.checkID(taiKhoanNV, "Tài khoản NV không được trùng", "tbTKNV", dsnv.mangNV);

    // Kiểm tra tên NV: Kiểm tra rỗng, kiểm tra ký tự chữ
    isValid &= validation.checkEmpty(tenNV, "Tên NV không được để trống", "tbTen") && validation.checkName(tenNV, "Tên NV Phải là kiểu chữ", "tbTen");

    // Kiểm tra email: Email phải đúng định dạng và không để trống
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");

    //kiểm tra pass: không được để trống và phải đúng địng dạng pass
    isValid &= validation.checkEmpty(matKhau, "Password không được để trống", "tbMatKhau") && validation.checkPass(matKhau, "Password phải đúng định dạng", "tbMatKhau");
    //Kiểm tra vị trí phải chọn vị trí
    isValid &= validation.checkSelect("chucvu", "Chọn chức vụ", "tbChucVu");

    // kiểm tra lương: ko bỏ trống , định dạng số, trong khoảng 1.000.000 - 20.000.000
    isValid &= validation.checkEmpty(salary, "Lương không được để trống", "tbLuongCB") && validation.checkNumber(salary, "Lương phải là kiểu Số", "tbLuongCB") && validation.checkSalary(salary, "Lương phải từ 1tr-20tr", "tbLuongCB");

    //kiểm tra giờ làm : ko bỏ trống , định dạng số, trong khoảng 80-200
    isValid &= validation.checkEmpty(hours, "Giờ làm không được để trống", "tbGiolam") && validation.checkNumber(hours, "Giờ làm phải là kiểu Số", "tbGiolam") && validation.checkHour(hours, "Giờ làm phải từ 80h - 200h", "tbGiolam");

    // kiểm tra ngày làm việc: ko được bỏ trống, địng dạng ngày
    isValid &= validation.checkEmpty(date, "Ngày  làm không được để trống", "tbNgay") && validation.checkDay(date, "Ngày  làm phải là kiểu mm/dd/yy", "tbNgay");

    if (isValid) {
        var nv = new NhanVien(taiKhoanNV, tenNV, email, matKhau, date, Number(salary), position, Number(hours));
        nv.luong = nv.tongLuong();
        nv.xepLoai = nv.xepLoai();
        nv.viTri = nv.showPosition()

        dsnv.themNV(nv);
        console.log(dsnv.mangNV);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }

}
getELE("btnThemNV").onclick = layThongTinNV;

//hiển thị thông tin lên table

function hienThiTable(mangNV) {
    var content = "";
    for (var i = 0; i < mangNV.length; i++) {
        var trNV = `<tr>
        <td>${mangNV[i].taiKhoanNV}</td>
        <td>${mangNV[i].tenNV}</td> 
        <td>${mangNV[i].email}</td> 
        <td>${mangNV[i].date}</td> 
        <td>${mangNV[i].viTri}</td> 
        <td>${mangNV[i].luong}</td>
        <td>${mangNV[i].xepLoai}</td>
        <td>
            <button onclick="xoaNhanVien('${mangNV[i].taiKhoanNV}')" class ="btn btn-danger">Xóa</button>
            <br>
            <br>
            <button onclick="xemChiTiet('${mangNV[i].taiKhoanNV}')" data-target="#myModal" data-toggle="modal" class ="btn btn-info">Info</button>
        </td>    
    </tr>`
        content += trNV;
    }
    console.log(content);
    getELE("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(tk) {
    dsnv.xoaNV(tk);
    setLocalStorage(dsnv.mangNV);
    hienThiTable(dsnv.mangNV);
}
//reset form mỗi khi nhấn vào button thêm sinh viên
function resetForm() {
    getELE("resetForm").reset();
    getELE("tknv").disabled = false;
    getELE("tbTKNV").innerHTML = "";
    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").innerHTML = "";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").innerHTML = "";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").innerHTML = "";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbChucVu").innerHTML = "";
    getELE("tbChucVu").style.display = "none";
    getELE("tbLuongCB").innerHTML = "";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbGiolam").innerHTML = "";
    getELE("tbGiolam").style.display = "none";
}

//Lấy thông tin chi tiết nv đẩy lên form
function xemChiTiet(tk) {
    var nvTimDuoc = dsnv.layChiTiet(tk);
    console.log("Nhân viên tìm được")
    if (nvTimDuoc != undefined) {
        //tìm được nhân viên
        getELE("tknv").disabled = true;
        getELE("tknv").value = nvTimDuoc.taiKhoanNV;
        getELE("name").value = nvTimDuoc.tenNV;
        getELE("email").value = nvTimDuoc.email;
        getELE("password").value = nvTimDuoc.matKhau;
        getELE("datepicker").value = nvTimDuoc.date;
        getELE("luongCB").value = nvTimDuoc.salary;
        getELE("chucvu").value = nvTimDuoc.position;
        getELE("gioLam").value = nvTimDuoc.hours;
    } else {
        console.log("Không tìm được")
    }
}



function capNhat() {
    var taiKhoanNV = getELE("tknv").value;
    var tenNV = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var date = getELE("datepicker").value;
    var salary = Number(getELE("luongCB").value);
    var position = getELE("chucvu").value;
    var hours = Number(getELE("gioLam").value);
    // var isValid = true;

    // // Kiểm tra tài khoảng NV không được trùng và không được để trống

    // isValid &= validation.checkEmpty(taiKhoanNV, "Tài khoản NV không được để trống", "tbTKNV");
    // // Kiểm tra tên NV: Kiểm tra rỗng, kiểm tra ký tự chữ
    // isValid &= validation.checkEmpty(tenNV, "Tên NV không được để trống", "tbTen") && validation.checkName(tenNV, "Tên NV Phải là kiểu chữ", "tbTen");

    // // Kiểm tra email: Email phải đúng định dạng và không để trống
    // isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail");

    // //kiểm tra pass: không được để trống và phải đúng địng dạng pass
    // isValid &= validation.checkEmpty(matKhau, "Password không được để trống", "tbMatKhau") && validation.checkPass(matKhau, "Password phải đúng định dạng", "tbMatKhau");
    // //Kiểm tra vị trí phải chọn vị trí
    // isValid &= validation.checkSelect("chucvu", "Chọn chức vụ", "tbChucVu");

    // // kiểm tra lương: ko bỏ trống , định dạng số, trong khoảng 1.000.000 - 20.000.000
    // isValid &= validation.checkEmpty(salary, "Lương không được để trống", "tbLuongCB") && validation.checkNumber(salary, "Lương phải là kiểu Số", "tbLuongCB") && validation.checkSalary(salary, "Lương phải từ 1tr-20tr", "tbLuongCB");

    // //kiểm tra giờ làm : ko bỏ trống , định dạng số, trong khoảng 80-200
    // isValid &= validation.checkEmpty(hours, "Giờ làm không được để trống", "tbGiolam") && validation.checkNumber(hours, "Giờ làm phải là kiểu Số", "tbGiolam") && validation.checkHour(hours, "Giờ làm phải từ 80h - 200h", "tbGiolam");
    // //checkday

    // isValid &= validation.checkEmpty(date, "Ngày  làm không được để trống", "tbNgay") && validation.checkDay(date, "Ngày  làm phải là kiểu mm/dd/yy", "tbNgay");

    // if (isValid) {
    //     var nv = new NhanVien(taiKhoanNV, tenNV, email, matKhau, date, salary, position, hours);
    //     nv.luong = nv.tongLuong();
    //     nv.xepLoai = nv.xepLoai();
    //     nv.viTri = nv.showPosition();

    //     dsnv.updateNV(nv);
    //     hienThiTable(dsnv.mangNV);
    //     setLocalStorage(dsnv.mangNV);
    // }
    var nv = new NhanVien(taiKhoanNV, tenNV, email, matKhau, date, salary, position, hours);
    nv.luong = nv.tongLuong();
    nv.xepLoai = nv.xepLoai();
    nv.viTri = nv.showPosition();

    dsnv.updateNV(nv);
    hienThiTable(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

// Người dùng gõ input thì lập tức search
//keypress, keydown, keyup
getELE("searchName").onkeyup = function () {
    var tuKhoa = getELE("searchName").value;
    var mangTK = dsnv.searchName(tuKhoa);
    hienThiTable(mangTK);
}