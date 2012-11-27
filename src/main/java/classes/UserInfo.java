/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

/**
 *
 * @author A
 */

public class UserInfo  implements Serializable
{
      
        int id;
        String fname;
        String mname;
        String lname;
        String dob;
        
        String gender;
        String address;
        String mobile;
        ArrayList arr;
        ArrayList hobby;
        String acctype;
        ArrayList facilities;
        String email;

   
        
        
    
    

    
        public UserInfo() 
    {
        
        System.out.println("inside userinfo ->>>>>>>>>");   
        arr=new ArrayList();
        hobby=new ArrayList();
        
        
        arr.add("Playing");
        arr.add("Dancing");
        arr.add("Traveling");
        
        
        facilities=new ArrayList();
        facilities.add("ATM");
        facilities.add("Check Book");
        facilities.add("Neb Banking");
        
        
        
        
        
        
        
        
    }

    
    public int getId() 
         {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    
    
    public String check()
    {
        HttpSession ss=(HttpSession)FacesContext.getCurrentInstance().getExternalContext().getSession(true);
        
         System.out.println("SESSION- >>> "+ss.getAttribute("USERNAME"));
           System.out.println("inside check userinfo ->>>> "+gender);
           System.out.println("inside check userinfo address ->>>> "+address);
           System.out.println("inside check userinfo this ->>>> "+this);
           
               
           
           
           
           
           
           
           return "";
    
    }
    
    
    public String toString()
    {
        
        
        return fname+mname+lname+dob+mobile;     
        
         
    }
    
    
    public ArrayList getArr() {
        return arr;
    }

    public void setArr(ArrayList arr) {
        this.arr = arr;
    }

    
    public ArrayList getHobby() {
        return hobby;
    }

    public void setHobby(ArrayList hobby) {
        this.hobby = hobby;
    }
    
    public String getAcctype() {
        return acctype;
    }

    public void setAcctype(String acctype) {
        this.acctype = acctype;
    }

    
    public ArrayList getFacilities() {
        return facilities;
    }

    public void setFacilities(ArrayList facilities) {
        this.facilities = facilities;
    }
     
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}
