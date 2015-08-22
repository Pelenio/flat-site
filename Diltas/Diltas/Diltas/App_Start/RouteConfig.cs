using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Diltas
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
           
            routes.MapRoute(
                name: "AcitonWithHtml",
                url: "{action}.html",
                defaults: new { controller = "Diltas", action = "hakimizda" }
            );
            
            routes.MapRoute(
              name: "ControllerAndAcitonWithHtml",
              url: "{controller}/{action}.html",
              defaults: new { controller = "Diltas", action = "hakimizda" }
            );
            
           
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Diltas", action = "hakimizda" }
            );
        }
    }
}
