using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Antlr.Runtime;


namespace HRSystem.Web.Infrastructure.ValidationMessage
{
    [Serializable]
    public class ValidateMessage
    {

        public string Title { get; set; }
        public string Message { get; set; }
        public MessageType MessageType { get; set; }
        public bool IsSticky { get; set; }
      
        


    }
    public enum MessageType
    {
        Success, Error, Info, Warning
    }
}