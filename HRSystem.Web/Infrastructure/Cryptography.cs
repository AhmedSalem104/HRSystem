using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace HRSystem.Web.Infrastructure
{
    public class Cryptography
    {
        public static string EncryptPassword(string stringToEncrypt, string Key)
        {

            if (Key == null || Key.Length == 0)
            {
                if (Key == "" || Key == null)
                    Key = "SahabHR_Full";
                Key = Key.ToUpper().Replace("SahabHR_", "");
            }
            SSTCryptographer SSTCryptographer = new SSTCryptographer();
            return SSTCryptographer.Encrypt(stringToEncrypt, Key);
        }

        public static string DecryptPassword(string stringToDecrypt, string Key)
        {
            if (Key == null || Key.Length == 0)
            {
                // Key = MS.General.Parse(ConnectionString, "Database");
                if (Key == "")
                    Key = "SahabHR_Full";
                Key = Key.ToUpper().Replace("SahabHR_", "");
            }
            SSTCryptographer SSTCryptographer = new SSTCryptographer();
            return SSTCryptographer.Decrypt(stringToDecrypt, Key);
        }
    }

    internal class SSTCryptographer
    {
        private static string _key;
        public SSTCryptographer()
        {
        }

        public static string Key
        {
            set { _key = value; }
        }

        //' <summary>
        //' Encrypt the given string using the default key.
        //' </summary>
        //' <param name="strToEncrypt">The string to be encrypted.</param>
        //' <returns>The encrypted string.</returns>
        public static string Encrypt(string strToEncrypt)
        {
            try
            {
                return Encrypt(strToEncrypt, _key);
            }
            catch (Exception ex)
            {
                return "Wrong Input. " + ex.Message;

            }
        }

        /// <summary>
        /// Decrypt the given string using the default key.
        /// </summary>
        /// <param name="strEncrypted">The string to be decrypted.</param>
        /// <returns>The decrypted string.</returns>
        public static string Decrypt(string strEncrypted)
        {
            try
            {
                return Decrypt(strEncrypted, _key);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                return string.Empty;
            }
        }

        /// <summary>
        /// Encrypt the given string using the specified key.
        /// </summary>
        /// <param name="strToEncrypt">The string to be encrypted.</param>
        /// <param name="strKey">The encryption key.</param>
        /// <returns>The encrypted string.</returns>
        public static string Encrypt(string strToEncrypt, string strKey)
        {
            try
            {
                TripleDESCryptoServiceProvider objDESCrypto = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider objHashMD5 = new MD5CryptoServiceProvider();

                byte[] byteHash = null;
                byte[] byteBuff = null;
                string strTempKey = strKey;

                byteHash = objHashMD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(strTempKey));
                objHashMD5 = null;
                objDESCrypto.Key = byteHash;
                objDESCrypto.Mode = CipherMode.ECB;
                //CBC, CFB
                byteBuff = ASCIIEncoding.ASCII.GetBytes(strToEncrypt);
                return Convert.ToBase64String(objDESCrypto.CreateEncryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));
            }
            catch
            {
                return string.Empty;
            }
        }


        /// <summary>
        /// Decrypt the given string using the specified key.
        /// </summary>
        /// <param name="strEncrypted">The string to be decrypted.</param>
        /// <param name="strKey">The decryption key.</param>
        /// <returns>The decrypted string.</returns>
        public static string Decrypt123(string strEncrypted, string strKey)
        {
            try
            {
                TripleDESCryptoServiceProvider objDESCrypto = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider objHashMD5 = new MD5CryptoServiceProvider();

                byte[] byteHash = null;
                byte[] byteBuff = null;
                string strTempKey = strKey;

                byteHash = objHashMD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(strTempKey));
                objHashMD5 = null;
                objDESCrypto.Key = byteHash;
                objDESCrypto.Mode = CipherMode.ECB;
                //CBC, CFB

                byteBuff = ASCIIEncoding.ASCII.GetBytes(strEncrypted);

                System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
                byteBuff = encoding.GetBytes(strEncrypted);


                string strDecrypted = ASCIIEncoding.ASCII.GetString(objDESCrypto.CreateDecryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));
                objDESCrypto = null;

                return strDecrypted;


            }
            catch (Exception ex)
            {
                return "Wrong Input. " + ex.Message;
            }
        }
        public static string Decrypt(string toDecrypt, string key)
        {
            byte[] keyArray = null;
            byte[] toEncryptArray = Convert.FromBase64String(toDecrypt);

            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

            return UTF8Encoding.UTF8.GetString(resultArray);
        }

    }
}