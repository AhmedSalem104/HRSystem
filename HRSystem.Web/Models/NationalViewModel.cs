using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class NationalViewModel
    {

     
        public short NatId { get; set; }

        [Required(ErrorMessage = "من فضلك ادخل اسم الجنسية")]
        public string NatName { get; set; }
        public bool IsSaudi { get; set; }
        public bool IdNoCheck { get; set; }
        public string CountryCode { get; set; }
        public string EMP_NATIONALITY { get; set; }
        public bool Uploaded { get; set; }


    }
}