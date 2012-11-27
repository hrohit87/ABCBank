/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;
import javax.persistence.*;


/**
 *
 * @author A
 */


@Entity
@Table(name="user")
public class User 
{

    @Id 
    @Column(name="rno")        
    int rno;
    
    @Column(name="uname")
    String uname;
    
    @Column(name="pass")
    String pass;

    
    public User(){}
    
    public int getRno() {
        return rno;
    }

    public void setRno(int rno) {
        this.rno = rno;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
    
    
    public String toString()
    {
    
      return rno+" "+uname+" "+pass;
    }
    
    
    
}
