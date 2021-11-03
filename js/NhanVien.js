
// Khai báo lớp đối tượng Nhân Viên

function NhanVien(tk,ten, email, pass, date, salary, position, hours){
    //thuộc tính
    
    this.taiKhoanNV = tk;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = pass;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hours = hours;
    // phương thức
    this.tongLuong = function (){
        var tongLuong = caclSalary(this.position,this.salary);
        return tongLuong;
    }

    this.showPosition = function(){
        var content = showPosition(this.position);
        return content;
    }


    this.xepLoai = function (){
        var content = ""
        if (0<this.hours && this.hours<160){
            content+= "Xếp loại TB";
            console.log("Xếp loại TB");
        }else if (160<=this.hours && this.hours<176){
            content+= "Xếp loại Khá";
            console.log("Xếp loại Khá");
        }else if (176<=this.hours && this.hours<192){
            content+= "Xếp loại Giỏi";
            console.log("Xếp loại Giỏi");
        }else if (192<=this.hours){
            content+= "Xếp loại Xuất sắc";
            console.log("Xếp loại Xuất sắc");
        }else
        console.log("Giờ nhập ko hợp lệ");
        return content;
    }
}

function caclSalary(position,salary){
    var totalSalary = 0;
    if (position == "Boss"){
        totalSalary = salary*3;
    }else if(position == "Manager"){
        totalSalary = salary*2;
    }else if(position == "Staff"){
        totalSalary = salary*1;
    }
    return totalSalary;
}

function showPosition(position){
    var content = "";
    if (position == "Boss"){
        content+= "Sếp";
    }else if(position == "Manager"){
        content+= "Trưởng Phòng"
    }else if (position == "Staff"){
        content+= "Nhân viên";
    }
    return content;
}