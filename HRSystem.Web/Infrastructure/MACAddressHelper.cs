using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;
using System.Web;

namespace HRSystem.Web.Infrastructure
{
    public class MACAddressHelper
    {
        public string SplitMacAddress(string macadress)
        {
            for (int Idx = 4; Idx < macadress.Length; Idx += 5)
            {
                macadress = macadress.Insert(Idx, "-");
            }
            return macadress;
        }
        public string GetMACAddress()
        {
            NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
            String sMacAddress = string.Empty;
            String tempaddress = string.Empty;
            foreach (NetworkInterface adapter in nics)
            {
                if (sMacAddress == String.Empty)// only return MAC Address from first card  
                {
                    IPInterfaceProperties properties = adapter.GetIPProperties();
                    sMacAddress = adapter.GetPhysicalAddress().ToString();
                    tempaddress = SplitMacAddress(sMacAddress);
                }
            }
            return tempaddress;
        }
        public string SplitMacAddressAfterEnc(string macadress)
        {
            for (int Idx = 5; Idx < macadress.Length; Idx += 6)
            {
                macadress = macadress.Insert(Idx, "-");
            }
            return macadress;
        }
        public string CmpositeMacAddress(string macadress)
        {
            char[] delims = new[] { ':' };
            var CompositMac = macadress.Split(delims);
            string finalMac = String.Empty;

            foreach (var item in CompositMac)
            {
                string inputData = item;
                var data = Regex.Match(inputData, @"\d+").Value;

                int i = Convert.ToInt32(data) * 19;
                finalMac += "-" + item + i;
            }
            return finalMac;
        }
        public string CmpositeMacAddressss(string macadress)
        {
            char[] delims = new[] { '-' };
            var CompositMac = macadress.Split(delims);
            string finalMac = String.Empty;
            string finalresult = "";
            string Supfinalresult = "";
            int ii = 0;
            foreach (var item in CompositMac)
            {

                foreach (var i in item)
                {
                    int x1 = item.IndexOf(i);
                    int m = ASCIIEncoding.ASCII.GetByteCount("MAINTANENCE"); // DiteToDoor
                    if (x1 < 4)
                    {
                        if (x1 == 3)
                        {
                            int result = (x1 * i) + item[x1];
                            string re = result.ToString();
                            finalresult += re;
                        }
                        else
                        {
                            int result = (x1 * i) + item[x1 + 1];
                            string re = result.ToString();

                            finalresult += m + re;

                        }
                    }
                }
                ii++;
                if (ii <= 2)
                {

                    finalresult += "-";
                }
                //else {
                //    finalresult.Substring(0, 3);
                //}
            }
            finalMac = finalresult;
            return finalMac;
        }

        public string SubStringMacAddress(string macadress)
        {
            char[] delims = new[] { '-' };
            var CompositMac = macadress.Split(delims);
            string finalMac = String.Empty;
            int x = 0;
            foreach (var item in CompositMac)
            {
                string i = item.Substring(0, 4);
                x++;
                if (x <= 2)
                {
                    finalMac += i + "-";
                }
                else
                {
                    finalMac += i;
                }
            }
            return finalMac;
        }
        public  string EncryptString(string key, string plainText)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }
            var arr = Convert.ToBase64String(array);
            return Convert.ToBase64String(array);
        }
        public  string DecryptString(string key, string cipherText)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(cipherText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }
   
    }
}