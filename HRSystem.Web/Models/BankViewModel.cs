using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class BankViewModel
    {


        [Required(ErrorMessage = "من فضلك ادخل رقم البنك")]

        public byte BankId { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل اسم الجنسية")]

        public string BankName { get; set; }
        public string ShortName { get; set; }
        public string BankNameE { get; set; }
       


    }
}