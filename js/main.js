//global


var dsnv = new DanhSachNhanVien();


function getELE(id){
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

function layThongTinNV (){
    var taiKhoanNV = getELE("tknv").value ;
    var tenNV = getELE("name").value ;
    var email = getELE("email").value ;
    var matKhau = getELE("password").value ;
    var date = getELE("datepicker").value ;
    var salary = getELE("luongCB").value ;
    var position = getELE("chucvu").value ;
    var hours = getELE("gioLam").value ;


    var nv = new NhanVien(taiKhoanNV,tenNV,email,matKhau,date,Number(salary),position, Number(hours));
    nv.luong = nv.tongLuong();
    nv.xepLoai = nv.xepLoai();
    nv.viTri = nv.showPosition()

    dsnv.themNV(nv);
    console.log(dsnv.mangNV);
    hienThiTable(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}
getELE("btnThemNV").onclick = layThongTinNV;

//hiển thị thông tin lên table

function hienThiTable(mangNV){
    var content = "";
    for (var i = 0; i < mangNV.length; i++){
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

function xoaNhanVien(tk){
    dsnv.xoaNV(tk);
    setLocalStorage(dsnv.mangNV);
    hienThiTable(dsnv.mangNV);
}
//reset form mỗi khi nhấn vào button thêm sinh viên
function resetForm(){
    getELE("resetForm").reset();
    getELE("tknv").disabled = false;
}

//Lấy thông tin chi tiết nv đẩy lên form
function xemChiTiet(tk){
    var nvTimDuoc = dsnv.layChiTiet(tk);
    console.log("Nhân viên tìm được")
    if(nvTimDuoc != undefined){
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
    }else{
        console.log("Không tìm được")
    }
}



function capNhat(){
    var taiKhoanNV = getELE("tknv").value ;
    var tenNV = getELE("name").value ;
    var email = getELE("email").value ;
    var matKhau = getELE("password").value ;
    var date = getELE("datepicker").value ;
    var salary = Number(getELE("luongCB").value) ;
    var position = getELE("chucvu").value ;
    var hours = Number(getELE("gioLam").value) ;


    var nv = new NhanVien(taiKhoanNV,tenNV,email,matKhau,date,Number(salary),position, Number(hours));
    nv.luong = nv.tongLuong();
    nv.xepLoai = nv.xepLoai();
    nv.viTri = nv.showPosition();
    
    dsnv.updateNV(nv);
    hienThiTable(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}