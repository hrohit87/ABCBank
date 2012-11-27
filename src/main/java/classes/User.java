/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.Serializable;
import javax.faces.context.FacesContext;
import javax.faces.event.AbortProcessingException;
import javax.faces.event.ValueChangeEvent;
import javax.faces.event.ValueChangeListener;

import javax.faces.event.ActionEvent;
import javax.faces.event.ActionListener;
import javax.servlet.http.HttpSession;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

public class User implements Serializable,ValueChangeListener,ActionListener
{

    String username;
    String pass;
    String message;

   
    public User() 
    {
        username="rohit";
         System.out.println("timei is money ->>>>>>>>>>>>");
         
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
        
        
    }
    
     public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    
    public String check()
    {
        
        
        
         System.out.println("inside check "+username);
         HttpSession ss= (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(true); 
         ss.setAttribute("USERNAME","rohit");
         
         if(username.equals("hrohit") && pass.equals("hrohit"))
            return "success";
          else
         {
             
             System.out.println(" faile user->>>>>> "+username+" pass "+pass);
             message="Invalid Username or Password.";
             return "fail";
         }
    
    }
    
    public void clear()
    {
        username="";
        pass="";
    
    
    }
    
    public String sayHello()
    {
         System.out.println("Say hello->>> "+username);
         return "sayhello";
    }
    
    
    public void processValueChange(ValueChangeEvent ee)
    {
    
        System.out.println("Value changed ->>>>>>>>>>>>>>");
    }
    

    public void valueChange(ValueChangeEvent ee)
    {
    
        System.out.println("Value changed ->>>>>>>>>>>>>>");
    }
    
    
    
    public void processAction(ActionEvent ee) throws AbortProcessingException
    {
    
         System.out.println("inside process action ->>>>>>>>>>>>>");
        
    }
    

    
   
    
}
