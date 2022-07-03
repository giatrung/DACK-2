import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class Bitis {

    //Đây là phần code của chúng em
    //em sẽ gán cho email và password giả định trường hợp đăng kí thành công
    String lastname;
    String firstname;
    String email = "ddd@gmail.com";
    String password="123";

    //Function bắt lỗi chức năng register
    public boolean register(String lastname, String firstname, String email, String password) {
        // Các field không được rỗng
        if (lastname.isEmpty() || firstname.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return false;
        }
        //lastname không được có kí tự đặc biệt
        if (lastname.contains("$") || lastname.contains("/") || lastname.contains("\\") || lastname.contains("@")) {
            return false;
        }
        //firstname không được có kí tự đặc biệt
        if (firstname.contains("$") || firstname.contains("/") || firstname.contains("\\") || firstname.contains("@")) {
            return false;
        }

        //email phải có định dạng @
        if (!email.contains("@")) {
            return false;
        }

        //mật khẩu tối thiểu 3 kí tự
        if (password.length() < 3) {
            return false;
        }
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.password = password;
        return true;
    }

    //Đây là chức năng đăng nhập
    public boolean login(String email, String password) {
        //email và password không được rỗng
        if (email.isEmpty() || password.isEmpty()) {
            return false;
        }
        //kiểm tra email và password có đúng hay không?
        if(email == this.email && password == this.password){
            return true;
        }
        return false;
    }

    //Chức năng cập nhật thông tin user
    public boolean userInfo(String lastname, String firstname, String email, String phone, String birthday, String address) {

        //Những field tên và email tương tự như register
        if (lastname.isEmpty() || firstname.isEmpty() || email.isEmpty() || phone.isEmpty() || birthday.isEmpty() || address.isEmpty()) {
            return false;
        }
        if (lastname.contains("$") || lastname.contains("/") || lastname.contains("\\") || lastname.contains("@")) {
            return false;
        }
        if (firstname.contains("$") || firstname.contains("/") || firstname.contains("\\") || firstname.contains("@")) {
            return false;
        }

        if (!email.contains("@")) {
            return false;
        }
        //Số điện thoại phải 10 số
        if (phone.length() != 10) {
            return false;
        }
        return true;
    }
}