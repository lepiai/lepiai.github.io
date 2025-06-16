// 映射字段名到中文别名的对象
const fieldAliases = {
    "ss_num_train_images": "训练集图片学习总数",
    "ss_sd_model_name": "底模名称",
    "ss_epoch": "训练轮数",
    "modelspec.resolution": "样图分辨率",
    "ss_resolution": "样图分辨率",
    "ss_clip_skip": "clip跳过",
    "ss_multires_noise_iterations": "多分辨率（金字塔）噪声扩散次数",
    "ss_total_batch_size": "批次大小",
    "ss_mixed_precision": "训练混合精度",
    "ss_tag_frequency": "标签及频率",
    "ss_seed": "随机种子",
    "ss_sampler": "采样器",
    "ss_num_epochs": "循环次数",
    "n_repeats": "单张图片学习次数",
    "ss_learning_rate": "总学习率",
    "ss_unet_lr": "Unet学习率",
    "ss_text_encoder_lr": "文本编码器学习率",
    "ss_lr_warmup_steps": "学习率预热步数",
    "ss_lr_scheduler": "学习率调度器",
    "ss_optimizer": "优化器",
    "ss_network_alpha": "网络Alpha",
    "ss_network_dim": "学习精细度,常用4~128",
    "ss_shuffle_caption": "打乱标注,提高泛化性",
    "ss_keep_tokens": "保持token数",
    "ss_max_token_length": "最大token长度",
    "ss_noise_offset": "（0~1）噪声偏移设置金字塔噪声后这个值失效",
    "ss_multires_noise_discount": "多分辨率（金字塔）衰减率",
    "ss_output_name":"训练输出的文件名",
    "img_count":"训练集图片数量",
    "ss_batch_size_per_device":"批次大小",
    "ss_max_train_steps":"最大训练步数",
    "ss_gradient_checkpointing":"梯度检查点",
    "ss_gradient_accumulation_steps":"梯度累加步数",
    "ss_min_snr_gamma":"最小信噪比伽马值，如果启用推荐为 5",
    "ss_enable_bucket":"当训练集中图片尺寸不一致时，可以根据图像尺寸将数据分成若干种尺寸的batch",
    "ss_max_bucket_reso":"arb 桶最大分辨率",
    "ss_min_bucket_reso":"arb 桶最小分辨率",
    "ss_prior_loss_weight":"正则化 - 先验损失权重",
    "ss_network_module":"训练网络模块",
    "ss_network_dropout":"dropout 概率 （与 lycoris 不兼容，需要用 lycoris 自带的）",
    "ss_scale_weight_norms":"最大范数正则化。如果使用，推荐为 1",
    "ss_cache_latents":"缓存图像 latent",
    "ss_full_fp16":"完全使用 FP16 精度",
    "ss_lowram":"低内存模式 该模式下会将 U-net、文本编码器、VAE 直接加载到显存中",
    "ss_flip_aug":"图像翻转",
    "ss_color_aug":"颜色改变",
    "ss_random_crop":"随机剪裁",
    "ss_training_finished_at":"训练完成时间",
    "ss_training_started_at":"训练开始时间",
    "ss_reg_dataset_dirs":"正则化数据集路径。默认留空，不使用正则化图像",
    "ss_v2":"底模为 sd2.0 以后的版本需要启用",
	"ss_caption_dropout_every_n_epochs":"每 N 个 epoch 丢弃全部标签",
	"ss_caption_tag_dropout_rate":"按逗号分隔的标签来随机丢弃 tag 的概率",
	"ss_caption_dropout_rate":"丢弃全部标签的概率，对一个图片概率不使用 caption 或 class token",
	"ss_num_reg_images":"正则训练集图片数量",
	"ss_num_batches_per_epoch":"每轮学习批次",
	"ss_steps":"训练步数",
	"ss_max_grad_norm":"最大梯度范数，0表示没有clip",
	"ss_debiased_estimation":"无偏估计损失",
	"ss_adaptive_noise_scale":"自适应噪声比例",
	"ss_zero_terminal_snr":"终端零信噪比噪声",
	"ss_face_crop_aug_range":"脸部数据增强",
	"modelspec.encoder_layer":"神经网络层",
	"ss_bucket_no_upscale":"分桶时不进行图像放大",
	"ss_base_model_version":"基础模型版本",
	"ss_training_comment":"对网络的描述信息"
	
	// 字段别名...
};
document.getElementById('uploadArea').addEventListener('dragover', function(event) {
    event.preventDefault();
});

// document.getElementById('uploadArea').addEventListener('drop', function(event) {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     handleFile(file);
// });

// 文件拖拽区域的drop事件处理函数
document.getElementById('uploadArea').addEventListener('drop', function(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
    // 显示当前上传的文件名
    document.getElementById('fileNameDisplay').textContent = file.name;
});

document.getElementById('uploadArea').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// document.getElementById('fileInput').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     handleFile(file);
// });

// 文件上传按钮的change事件处理函数
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    handleFile(file);
    // 显示当前上传的文件名
    document.getElementById('fileNameDisplay').textContent = '当前查看的json文件：' + file.name;
});

document.getElementById('parseButton').addEventListener('click', function() {
    const jsonText = document.getElementById('jsonTextarea').value;
    try {
        const jsonData = JSON.parse(jsonText);
        handleJsonData(jsonData);
    } catch (error) {
        console.error('Invalid JSON format:', error);
    }
});

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const jsonData = JSON.parse(event.target.result);
        handleJsonData(jsonData);
    };
    reader.readAsText(file);
}

function handleJsonData(jsonData) {
    // 清空之前显示的内容
    document.getElementById('importantTableContainer').innerHTML = '';
    document.getElementById('allDetailsTableContainer').innerHTML = '';
    
    // 以下是您原先的代码，不需要修改
    convertJsonToTime(jsonData); // 转换时间戳为时间
    const importantTableHtml = jsonToTableWithSpecifiedFields(jsonData);
    document.getElementById('importantTableContainer').innerHTML = importantTableHtml;
    document.getElementById('moreButton').style.display = 'block';
    document.getElementById('moreButton').addEventListener('click', function() {
        const allDetailsTableHtml = jsonToTableAllDetails(jsonData);
        document.getElementById('allDetailsTableContainer').innerHTML = allDetailsTableHtml;
        document.getElementById('allDetailsTableContainer').style.display = 'block';
    });
}

// 其他函数保持不变...


//查看更多按钮事件
document.getElementById('moreButton').addEventListener('click', function() {
    const allDetailsTableContainer = document.getElementById('allDetailsTableContainer');
    if (allDetailsTableContainer.style.display === 'none' || allDetailsTableContainer.style.display === '') {
        allDetailsTableContainer.style.display = 'block';
        document.getElementById('moreButton').textContent = '收起更多';
    } else {
        allDetailsTableContainer.style.display = 'none';
        document.getElementById('moreButton').textContent = '查看更多';
    }
});




 document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(event) {
        // 清空之前显示的内容
        document.getElementById('importantTableContainer').innerHTML = '';
        document.getElementById('allDetailsTableContainer').innerHTML = '';
        // 以下是您原先的代码，不需要修改
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const jsonData = JSON.parse(event.target.result);
            convertJsonToTime(jsonData); // 转换时间戳为时间
            const importantTableHtml = jsonToTableWithSpecifiedFields(jsonData);
            document.getElementById('importantTableContainer').innerHTML = importantTableHtml;
            document.getElementById('moreButton').style.display = 'block';
            document.getElementById('moreButton').addEventListener('click', function() {
                const allDetailsTableHtml = jsonToTableAllDetails(jsonData);
                document.getElementById('allDetailsTableContainer').innerHTML = allDetailsTableHtml;
                document.getElementById('allDetailsTableContainer').style.display = 'block';
            });
        };
        reader.readAsText(file);
    }

function convertJsonToTime(jsonData) {
    if (jsonData === null) {
        return;
    }
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key) && typeof jsonData[key] === 'object') {
            convertJsonToTime(jsonData[key]);
        } else if (!isNaN(jsonData[key])) {
            // 如果是数字类型且长度大于 10，假设是时间戳，进行转换
            if (jsonData[key].toString().length > 10) {
                jsonData[key] = timestampToDatetime(jsonData[key]);
            }
        }
    }
}

function timestampToDatetime(timestamp) {
    const date = new Date(parseFloat(timestamp) * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

    
	
	function jsonToTableWithSpecifiedFields(jsonData) {
	    let tableHtml = '<table>';
	    const specifiedFields = [
	        "ss_sd_model_name",
	        "ss_num_train_images",
	        "n_repeats",
			"ss_num_epochs",
	        "img_count",
	        "ss_max_train_steps",
	        "ss_resolution",
	        "ss_total_batch_size",
	        "ss_learning_rate",
			"ss_text_encoder_lr",
			"ss_unet_lr",
			"ss_network_dim",
			"ss_optimizer",
			"ss_training_started_at",
	        "ss_training_finished_at",
	        
	    ];
	    for (const field of specifiedFields) {
	        const fieldValue = findFieldValue(jsonData, field);
	        if (fieldValue !== undefined) {
	            tableHtml += '<tr>';
	            const alias = fieldAliases[field] ? ` [${fieldAliases[field]}]` : '';
	            tableHtml += `<th>${field}${alias}</th>`;
	            if (typeof fieldValue === 'object') {
	                tableHtml += `<td>${jsonToTableWithSpecifiedFields(fieldValue)}</td>`;
	            } else {
	                tableHtml += `<td>${fieldValue}</td>`;
	            }
	            tableHtml += '</tr>';
	        }
	    }
	    tableHtml += '</table>';
	    return tableHtml;
	}
	
	// 递归查找字段值
	function findFieldValue(obj, field) {
	    if (obj.hasOwnProperty(field)) {
	        return obj[field];
	    }
	    for (const key in obj) {
	        if (typeof obj[key] === 'object') {
	            const fieldValue = findFieldValue(obj[key], field);
	            if (fieldValue !== undefined) {
	                return fieldValue;
	            }
	        }
	    }
	    return undefined;
	}


    function jsonToTableAllDetails(jsonData) {
        let tableHtml = '<table>';
        for (const key in jsonData) {
            tableHtml += '<tr>';
            const alias = getFieldAlias(key) ? ` [${getFieldAlias(key)}]` : '';
            tableHtml += `<th class=th_add>${key}${alias}</th>`;
            if (typeof jsonData[key] === 'object') {
                tableHtml += `<td>${jsonToTableAllDetails(jsonData[key])}</td>`;
            } else {
                tableHtml += `<td>${jsonData[key]}</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        return tableHtml;
    }

    // 获取字段的中文别名，如果没有别名则返回空字符串
    function getFieldAlias(fieldName) {
        return fieldAliases[fieldName] || '';
    }

    // 当页面滚动时检查是否显示返回顶部按钮
    window.onscroll = function() {
        showBackToTopButton();
    };

    // 显示或隐藏返回顶部按钮
    function showBackToTopButton() {
        const backToTopBtn = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 1024 || document.documentElement.scrollTop > 1024) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // 当用户点击返回顶部按钮时
    document.getElementById("backToTopBtn").onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
	
	//解析按钮事件
	
	let isParsing = true; // 初始状态为解析
	
	document.getElementById('parseButton').addEventListener('click', function() {
	    if (isParsing) {
	        parseJson();
	    } else {
	        clearTextarea();
	    }
	});
	
	function parseJson() {
	    const jsonText = document.getElementById('jsonTextarea').value;
	    try {
	        const jsonData = JSON.parse(jsonText);
	        handleJsonData(jsonData);
	        // 切换按钮状态和文本
	        document.getElementById('parseButton').textContent = '清空';
	        isParsing = false;
	    } catch (error) {
	        console.error('Invalid JSON format:', error);
	    }
	}
	
	function clearTextarea() {
	    // 清空文本框内容
	    document.getElementById('jsonTextarea').value = '';
	    // 切换按钮状态和文本
	    document.getElementById('parseButton').textContent = '解析';
	    isParsing = true;
	}
