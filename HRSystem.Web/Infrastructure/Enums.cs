using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Security.AccessControl;
using System.Web;
using System.Xml.Linq;
using HRSystem.Web.Infrastructure.Resources;

namespace HRSystem.Web.Infrastructure
{
    public class Enums
    {

        public enum DegreeCheckList
        {


            [Description("الدرجة الحالية")]
            Value1 = 1,
            [Description(" بداية المربوط ")]
            Value2 = 2

        }

        public enum NatureAllowTypeIdList
        {


            [Description("ميداني")]
            Value1 = 1,
            [Description("خسارة مادية")]
            Value2 = 2,
            [Description("صعوبة عمل اثار مرضية")]
            Value3 = 3,
            [Description(" حاسب ألي ")]
            Value4 = 4,

        }

        public enum SubJectList
        {


            [Description(" نقل")]
            Value1 = 1,
            [Description("  ترقية ")]
            Value2 = 2

        }



        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }
}