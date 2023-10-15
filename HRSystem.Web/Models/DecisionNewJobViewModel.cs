using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using HRSystem.Web.Infrastructure;
using static HRSystem.Web.Infrastructure.Enums;

namespace HRSystem.Web.Models
{
    public class DecisionNewJobViewModel
    {

   
        [Required(ErrorMessage = "من فضلك ادخل التاريخ ")]



        public short DecisionNewJobID { get; set; }
        public DateTime? Date { get; set; }
        public string DateH { get; set; }
        public byte Subject { get; set; }
        public string EnclosureCount { get; set; }
        public Nullable<int> OwnerId { get; set; }
        [Required(ErrorMessage = "من فضلك اختار موظف  ")]

        public int EmpId { get; set; }
        public DateTime? StartDate { get; set; }
        public string StartDateH { get; set; }
        public string Notes { get; set; }
        public string PromotionID { get; set; }
        public string DecisionNo { get; set; }
        public string ClassificationNo { get; set; }
        public Nullable<int> JobSerial { get; set; }
        public Nullable<int> ManagerId { get; set; }
        public Nullable<short> DecisionsListYear { get; set; }
        public Nullable<short> DecisionsListSerial { get; set; }


        public string EmpName { get; set; }


        public string SubJectList
        {
            get { return Enums.GetEnumDescription((SubJectList)Subject); }
        }






    }
}