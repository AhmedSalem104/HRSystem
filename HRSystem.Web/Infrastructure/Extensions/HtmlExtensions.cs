using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;


namespace HRSystem.Web.Infrastructure.Extensions
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString Script(this HtmlHelper htmlHelper, Func<object, HelperResult> template)
        {
            htmlHelper.ViewContext.HttpContext.Items["_script_" + Guid.NewGuid()] = template;
            return MvcHtmlString.Empty;
        }

        public static IHtmlString RenderScripts(this HtmlHelper htmlHelper)
        {
            foreach (object key in htmlHelper.ViewContext.HttpContext.Items.Keys)
            {
                if (key.ToString().StartsWith("_script_"))
                {
                    var template = htmlHelper.ViewContext.HttpContext.Items[key] as Func<object, HelperResult>;
                    if (template != null)
                    {
                        htmlHelper.ViewContext.Writer.Write(template(null));
                    }
                }
            }
            return MvcHtmlString.Empty;
        }
        public static MvcHtmlString DecimalBoxFor<TModel>(this HtmlHelper<TModel> html, Expression<Func<TModel, decimal?>> expression, string format, object htmlAttributes = null)
        {
            var name = ExpressionHelper.GetExpressionText(expression);

            decimal? dec = expression.Compile().Invoke(html.ViewData.Model);

            // Here you can format value as you wish
            var value = dec.HasValue ? (!string.IsNullOrEmpty(format) ? dec.Value.ToString(format) : dec.Value.ToString())
                        : "";

            return html.TextBox(name, value, htmlAttributes);
        }
        public static List<SelectListItem> EnumToSelectList<T>()
        {


            List<SelectListItem> values = new List<SelectListItem>();

            foreach (var itemType in Enum.GetValues(typeof(T)))
            {
                //For each value of this enumeration, add a new EnumValue instance
                values.Add(new SelectListItem
                {

                    Value = Convert.ToInt32(itemType).ToString(),
                    Text = Enums.GetEnumDescription((Enum)itemType)
                }
              );
            }
            return values.ToList();



        }
    }
}