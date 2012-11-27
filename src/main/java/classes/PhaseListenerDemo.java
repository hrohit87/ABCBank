/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import javax.faces.application.NavigationHandler;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.HttpSession;

/**
 *
 * @author A
 */

public class PhaseListenerDemo implements PhaseListener 
{

    public void afterPhase(PhaseEvent event) 
    {

        FacesContext facesContext = event.getFacesContext();
        String currentPage = facesContext.getViewRoot().getViewId();
        
        System.out.println(" Current Page ->>>>>>>>> "+currentPage);

        boolean isLoginPage = (currentPage.lastIndexOf("Login.xhtml") > -1);

        HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(false);



        if (session == null) 
        {
             NavigationHandler nh = facesContext.getApplication().getNavigationHandler();
             nh.handleNavigation(facesContext, null, "Login");

        } else 
        {
             Object currentUser = session.getAttribute("username");

            if (!isLoginPage && (currentUser == null || currentUser == "")) 
            {
                NavigationHandler nh = facesContext.getApplication().getNavigationHandler();

                nh.handleNavigation(facesContext, null, "Login");

            }

        }
        FacesContext.getCurrentInstance().getExternalContext().invalidateSession();

    }

    public void beforePhase(PhaseEvent event) 
    {
    }

    public PhaseId getPhaseId() 
    {

        return PhaseId.RESTORE_VIEW;

    }
}
