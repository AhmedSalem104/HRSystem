using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace HRSystem.Web.Mappings

{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            

            var config = new MapperConfiguration(cfg => {
                cfg.AddProfile<MappingProfile>();
           
            });





        }
    }
}