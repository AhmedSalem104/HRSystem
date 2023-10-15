using HRSystem.Web.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRSystem.Web.App_Start
{
    public class Bootstrapper
    {
        public static void Run()
        {
            // Configure Autofac
           
            AutofacConfig.Configure();
            //Configure AutoMapper
            AutoMapperConfiguration.Configure();
        }
    }
}