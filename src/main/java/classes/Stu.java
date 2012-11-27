/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

/**
 *
 * @author A
 */

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


public class Stu 
{
 
     int rno;
     String name;
     int mrk;
     
     
     
    

    public int getRno() {
        return rno;
    }

    public void setRno(int rno) {
        this.rno = rno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMrk() {
        return mrk;
    }

    public void setMrk(int mrk) {
        this.mrk = mrk;
    }
    
    
    
    public String toString()
    {
    
        return rno+" "+name+" "+mrk;
    }
    
    
    
}
