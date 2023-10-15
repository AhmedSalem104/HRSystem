using HRSystem.Web.Infrastructure.ValidationMessage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRSystem.Web.Infrastructure
{
    public class BaseController : Controller
    {
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string lang = null;
            HttpCookie langCookie = Request.Cookies["culture"];
            if (langCookie != null)
            {
                lang = langCookie.Value;
            }
            else
            {
                var userLanguage = Request.UserLanguages;
                var userLang = userLanguage != null ? userLanguage[0] : "";
                if (userLang != "")
                {
                    lang = userLang;
                }
                else
                {
                    lang = LanguageManagement.GetDefaultLanguage();
                }
            }
            new LanguageManagement().SetLanguage(lang);
            return base.BeginExecuteCore(callback, state);
        }
        public static ValidateMessage AddMessage(Controller controller, string title, string message, MessageType messageType)
        {
            var toastr = controller.TempData["Toastr"] as ValidateMessageContainer;
            toastr = toastr ?? new ValidateMessageContainer();

            var toastMessage = toastr.AddMessage(title, message, messageType);
            controller.TempData["Toastr"] = toastr;
            return toastMessage;
        }

    }
}