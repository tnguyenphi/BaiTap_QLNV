function DanhSachNhanVien(){
    //propety
    this.mangNV = [];
    //thêm nhân viên
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }
    //nhập vào tên tài khoảng
    // return vị trí tìm được

    this.timViTri = function (tk){
        var viTri = -1;
        this.mangNV.map(function(nv,index){
            //kiểm tra nv có tên tk trùng với tên tìm kiếm
            if(nv.taiKhoanNV == tk){
                viTri = index;
            }
        })
        return viTri;
    }

    //B1: Tìm vị trí tk cần xóa trong mangNV
    //B2: Xóa nv ra khỏi mảng dựa vào vị trị
    this.xoaNV = function(tk){
        var viTri = this.timViTri(tk)
        if (viTri > -1){
            //tìm thấy vị trí
            // xóa nv ra khỏi mảng
            this.mangNV.splice(viTri,1);
        }
    }
    //lấy thông tin chi tiết
    
    this.layChiTiet = function (tk){
        var viTri = this.timViTri(tk)
        if (viTri > -1){
            return this.mangNV[viTri];
        }else{
            console.log("không tìm thấy")
        }
    }     

    this.updateNV = function (nv){
        var viTri = this.timViTri(nv.taiKhoanNV);
        if(viTri>-1){
            //Tìm Thấy và gán giá trị
            this.mangNV[viTri] = nv;
        }else{
            console.log("Không tìm thấy");
        }
    }
}