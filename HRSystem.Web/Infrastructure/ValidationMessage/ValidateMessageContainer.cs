using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace HRSystem.Web.Infrastructure.ValidationMessage
{
    [Serializable]
    public class ValidateMessageContainer
    {
        public bool ShowNewestOnTop { get; set; }
        public bool ShowCloseButton { get; set; }
        public List<ValidateMessage> ValisateMessages { get; set; }

        public ValidateMessage AddMessage(string title, string message, MessageType messageType)
        {
            var validateMessage = new ValidateMessage()
          {
              Title = title,
              Message = message,
              MessageType = messageType
          };
            ValisateMessages.Add(validateMessage);
            return validateMessage;
        }

        public ValidateMessageContainer()
        {
            ValisateMessages = new List<ValidateMessage>();
            ShowNewestOnTop = false;
            ShowCloseButton = false;
        }
    }
}