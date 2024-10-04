import("jquery");
$(

	function () {

		var fileInputBox = document.getElementById("#fileInputBox");
		var fileUploadForm = document.getElementById("fileUploadForm");
		var inputStatusDiv = jQuery("#inputStatusDiv");
		var inputStatusMessage = jQuery("#inputStatusMessage");
		var inputStatusWrapper = jQuery("#inputStatusMessage #wrapper");
		console.log(inputStatusWrapper);
		console.log(fileInputBox, inputStatusMessage, fileUploadForm);
		if (fileInputBox != null) {
			fileInputBox.addEventListener("change", function () {
				if (fileInputBox.files.length > 1) {
					inputStatusMessage.textContent = "Se�ilen Dosyalar";
					var fileNames = "";
					for (var file of fileInputBox.files) {
						fileNames = fileNames + `<p>${file.name}</p>`;
					}
					inputStatusWrapper.innerHTML = `${fileNames}`;
				} else if (fileInputBox.files.length == 1) {
					const fileName = fileInputBox.files[0].name;
					inputStatusMessage.textContent = `Se�ilen dosya : ${fileName}`;
				}
				else {
					inputStatusMessage.textContent = "L�tfen bir dosya se�in.";
				}
			});
		}
		if (fileUploadForm != null) {
			fileUploadForm.addEventListener("submit", function (event) {

				event.preventDefault();

				if (!fileInputBox.files.length) {
					inputStatusMessage.textContent = "L�tfen bir dosya se�in.";
					return;
				}

				const reader = new FileReader();


				reader.onload = function (event) {
					const fileContent = event.target.result;

					// �ifreleme i�lemi API den gelen key ile yapilacak
					const encryptedContent = encryptFileContent(fileContent);
					downloadEncryptedFile(encryptedContent, Date.now());

					/**
					// �ifrelenmi� i�eri�i yeni bir dosya olarak kaydet
					//downloadEncryptedFile(encryptedContent, file.name.replace('.txt', '_encrypted.txt'));
					//inputStatusMessage.textContent = `Dosya "${file.name}" ba�ar�yla �ifrelendi ve indiriliyor.`;
			
					*/

					$.ajax("http://localhost:5044",
						{
							method: "post",
							data: encryptedContent,
							error: alert("Failure on Upload"),
							success: alert("File uploads Successfull")
						}
					);
				};


			});
		}
		/**
		// Basit bir �ifre ��zme fonksiyonu deneme
		function decryptFileContent(encryptedContent) {
			return encryptedContent.split('').reverse().join(''); // �rnek �ifre ��zme: Ters �evrili i�eri�i geri �eviriyoruz.
		}
		
		// �ifrelenmi� i�eri�i yeni bir dosya olarak kaydetme
		**/

		/**
		// ��z�mlenen i�eri�i yeni bir dosya olarak kaydetme
		
		function downloadDecryptedFile(content, fileName) {
			const blob = new Blob([content], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
		
		**/

		/**
		// ��z�mleme butonuna t�kland���nda
		document.getElementById("decryptButton").addEventListener("click", function () {
			// E�er dosya se�ilmemi�se uyar� ver
			if (!fileInputBox.files.length) {
				inputStatusMessage.textContent = "L�tfen bir dosya se�in.";
				return;
			}
		
			const file = fileInputBox.files[0];
			const reader = new FileReader();
		
		
			reader.onload = function (event) {
				const encryptedContent = event.target.result;
				console.log("�ifreli dosya i�eri�i:", encryptedContent);
		
				// �ifre ��zme i�lemi
				const decryptedContent = decryptFileContent(encryptedContent);
				//  yeni bir dosya olarak kaydet
				downloadDecryptedFile(decryptedContent, file.name.replace('.txt', '_decrypted.txt'));
			};
		
		
			reader.readAsText(file);
		});
		
		**/

		// Basit bir �ifreleme fonksiyonu deneme
		function encryptFileContent(content) {
			// TODO
		}

		function downloadEncryptedFile(content, fileName) {
			const blob = new Blob([content], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}

	}
);