using System;
using HRSystem.Web.Infrastructure;
using static HRSystem.Web.Infrastructure.Enums;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class JobViewModel
    {


        [Required(ErrorMessage = "من فضلك ادخل رقم الوظيفة")]

        public int JobID { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل اسم الوظيفة ")]

        public string JobName { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل  بدل طبيعة عمل")]

        public decimal NatureAllow { get; set; }
        [Required(ErrorMessage = "من فضلك ادخل رقم طريقة الحساب")]

        public bool DegreeCheck { get; set; }
        public bool FixedNatureAllow { get; set; }
        public string JobNameEn { get; set; }
        public string JobClassCode { get; set; }
        public string JobNameCode { get; set; }

        public Nullable<byte> NatureAllowTypeId { get; set; }

        public int DegreeCheckValueFromEnums { get; set; }

        public string DegreeCheckList
        {
            get { return Enums.GetEnumDescription((DegreeCheckList)DegreeCheckValueFromEnums);}
        }

        public string NatureAllowTypeIdList
        {
            get { return Enums.GetEnumDescription((NatureAllowTypeIdList)NatureAllowTypeId);}
        }


    }
}