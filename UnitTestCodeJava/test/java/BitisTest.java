import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class BitisTest {
    //Đây là phần unit test
    //Chức năng đăng kí tài khoản

    //TH1: lastname và firstname chứa kí tự đặc biệt và kết quả mong muốn là trả về false
    @Test
    public void testRegister() {
        Bitis bitis = new Bitis();
        boolean result = bitis.register("$", "$", "ddd@gmail.com", "777e");
        assertFalse(result);
    }

    //TH2 lastname hoặc firstname chứa kí tự đặc biệt và kết quả mong muốn là trả về false
    @Test
    public void testRegister1() {
        Bitis bitis = new Bitis();
        boolean result = bitis.register("d", "$", "ddd@gmail.com", "777e");
        assertFalse(result);
    }

    //TH3 email không đúng định dạng, KQ mong mún trả về false
    @Test
    public void testRegister2() {
        Bitis bitis = new Bitis();
        boolean result = bitis.register("trung", "trung", "ddd", "777e");
        assertFalse(result);
    }

    //TH4 các field đều điền hợp lí, nên kết quả trả về true
    @Test
    public void testRegister3() {
        Bitis bitis = new Bitis();
        boolean result = bitis.register("trung", "trung", "ddd@gmail.com", "777e");
        assertTrue(result);
    }

    //Test login -------------------------------------------------------------------------------------------------------
    //Chức năng đăng nhập
    //TH1: Tài khoản, mật khẩu không đúng
    @Test
    public void testLogin() {
        Bitis bitis = new Bitis();
        boolean result = bitis.login( "ddd@gmail.com", "777e");
        assertFalse(result);
    }

    //TH2 tài khoản, mật khẩu hợp lệ thì cho đăng nhập, trả về true
    @Test
    public void testLogin3() {
        Bitis bitis = new Bitis();
        boolean result = bitis.login( "ddd@gmail.com", "123");
        assertTrue(result);
    }

    //get user info-----------------------------------
    //TH1: SDT không đúng 10 số nên false
    @Test
    public void testGetInfo() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "ddd", "ddd","ddd@gmail.com", "123", "07/11/1996","TPHCM");
        assertFalse(result);
    }

    //TH2 lastname và firstname rỗng nên false
    @Test
    public void testGetInfo2() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "", "","ddd@gmail.com", "1234455555", "07/11/1996","TPHCM");
        assertFalse(result);
    }

    //TH3 emal không đúng định dạng
    @Test
    public void testGetInfo3() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "ddd", "dd","dddgmail.com", "1234455555", "07/11/1996","TPHCM");
        assertFalse(result);
    }

    //TH4 địa chỉ rỗng nên false
    @Test
    public void testGetInfo5() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "dd", "ddd","ddd@gmail.com", "1234455555", "07/11/1996","");
        assertFalse(result);
    }

    //TH5 birthday rỗng
    @Test
    public void testGetInfo6() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "dd", "đ","ddd@gmail.com", "1234455555", "","TPHCM");
        assertFalse(result);
    }

    //TH6 mọi field đều hợp lệ nên true
    @Test
    public void testGetInfo7() {
        Bitis bitis = new Bitis();
        boolean result = bitis.userInfo( "ddd", "ddd","ddd@gmail.com", "1234455555", "07/11/1996","TPHCM");
        assertTrue(result);
    }
}
