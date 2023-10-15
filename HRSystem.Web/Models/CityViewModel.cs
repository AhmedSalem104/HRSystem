using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class CityViewModel
    {

        public short CityId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل اسم المدينة")]

        public string CityName { get; set; }
        public bool Default { get; set; }



       

    
    }
}