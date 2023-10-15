
using HRSystem.Data.Entites;
using System.Data;
using System.Web;
using System.Web.Optimization;
using System.Web.UI.WebControls;

namespace HRSystem.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.Bundles.Add(new ScriptBundle("~/Scripts/js").Include(
           "~/Content/modern-admin/vendors/js/vendors.min.js",
            "~/Content/modern-admin/vendors/js/charts/chartist.min.js",
             "~/Content/modern-admin/vendors/js/charts/chartist-plugin-tooltip.min.js",
                     "~/Content/modern-admin/vendors/js/charts/raphael-min.js",
                      "~/Content/modern-admin/vendors/js/charts/morris.min.js",
                               "~/Content/modern-admin/vendors/js/timeline/horizontal-timeline.js",
                               "~/Content/modern-admin/vendors/js/tables/jquery.dataTables.min.js",
                               "~/Content/modern-admin/vendors/js/tables/datatable/datatables.min.js",
                               //"~/Content/modern-admin/vendors/js/tables/datatable/dataTables.bootstrap4.min.js",
                               "~/Content/modern-admin/js/core/app-menu.js",
                                "~/Content/modern-admin/js/core/app.js",
                                "~/Content/modern-admin/vendors/js/extensions/toastr.min.js",
                                "~/Content/modern-admin/vendors/js/extensions/sweetalert2.all.min.js",
                                "~/Content/modern-admin/js/scripts/extensions/ex-component-sweet-alerts.js",
                                "~/Content/modern-admin/Calendar/jquery.plugin.js",
                                "~/Content/modern-admin/Calendar/jquery.calendars.js",
                             "~/Content/modern-admin/Calendar/jquery.calendars.plus.js",
                                "~/Content/modern-admin/Calendar/jquery.calendars.picker.js",
                              "~/Content/modern-admin/Calendar/jquery.calendars.ummalqura.js",
                                 "~/Content/modern-admin/Calendar/jquery.calendars.ummalqura-ar.js",

                                "~/Content/modern-admin/Calendar/jquery.calendars.picker-ar.js",
                                "~/Content/modern-admin/Calendar/moment.js",
                                "~/Content/modern-admin/Calendar/moment-hijri.js",
                                "~/Content/modern-admin/Calendar/Hijri.js",
                                "~/Content/modern-admin/vendors/js/extensions/dropzone.min.js",
                                      "~/Content/modern-admin/kendo/kendo.all.min.js",
                                          "~/Content/modern-admin/kendo/kendo.aspnetmvc.min.js"





         //"~/Scripts/jquery.validate.js",
         //  "~/Scripts/jquery.validate.unobtrusive.js"
         //"~/Content/modern-admin/js/scripts/pages/dashboard-ecommerce.js"
         //"~/Scripts/jquery.signalR-2.4.3.min.js"
         ));

            BundleTable.Bundles.Add(new StyleBundle("~/Content/css").Include(
      "~/Content/modern-admin/vendors/css/vendors-rtl.min.css",
           "~/Content/modern-admin/vendors/css/tables/datatable/datatables.min.css",
      "~/Content/modern-admin/vendors/css/weather-icons/climacons.min.css",
      "~/Content/modern-admin/fonts/meteocons/style.css",
      "~/Content/modern-admin/vendors/css/charts/morris.cs",
     "~/Content/modern-admin/vendors/css/charts/chartist.css",
     "~/Content/modern-admin/vendors/css/charts/chartist-plugin-tooltip.css",
     "~/Content/modern-admin/css-rtl/bootstrap.css",
     "~/Content/modern-admin/css-rtl/bootstrap-extended.css",

     "~/Content/modern-admin/css-rtl/colors.css",
      "~/Content/modern-admin/css-rtl/components.css",
      "~/Content/modern-admin/css-rtl/custom-rtl.css",
      "~/Content/modern-admin/css-rtl/core/menu/menu-types/vertical-menu-modern.css",
      "~/Content/modern-admin/css-rtl/core/colors/palette-gradient.css",
     "~/Content/modern-admin/fonts/simple-line-icons/style.css",
     "~/Content/modern-admin/css-rtl/core/colors/palette-gradient.css",
    "~/Content/modern-admin/css-rtl/pages/timeline.css",
     "~/Content/modern-admin/css-rtl/pages/dashboard-ecommerce.css",
     "~/Content/modern-admin/vendors/css/extensions/toastr.css",
     "~/Content/modern-admin/css-rtl/plugins/extensions/toastr.css",
     "~/Content/modern-admin/vendors/css/extensions/sweetalert2.min.css",
     "~/Content/modern-admin/Calendar/jquery.calendars.picker.css",
    "~/Content/modern-admin/vendors/css/file-uploaders/dropzone.min.css",
       "~/Content/modern-admin/css-rtl/plugins/file-uploaders/dropzone.css" ,
 "~/Content/modern-admin/css-rtl/pages/dropzone.css" ,
     "~/Content/modern-admin/css-rtl/style-rtl.css",
         "~/Content/modern-admin/kendo/kendo.common.min.css",
           "~/Content/modern-admin/kendo/kendo.blueopal.min.css"
    ));



        }
    }
}
