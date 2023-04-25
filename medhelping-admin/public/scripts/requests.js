function gbRequestDidSuccess(tag, response) {
    if ($("#loader").length > 0)
        $("#loader").addClass("d-none").removeClass("d-flex");

    if (tag == 1) {
        data = JSON.parse(decodeURIComponent(response));
        $.each(data.articles, function (index, article) {
            if (index == 20)
                return false;

            const type = article.type.split(',')[0];

            $(document)
                .find(".articles-list")
                .append(
                    `<div id="${article.id}"
                        class="col-6 px-0 d-flex text-center align-items-center article-box"
                        style="background-image: url(./img-fundo.jpg);">
                        <span class="badge text-bg-dark">${type}</span>
                        <div class="card-body w-100">
                            <h5 class="card-title">${article.title}</h5>
                            <small> ${article.user_name} em <br>${article.date} </small>
                        </div>
                    </div>`
                );
            $(document)
                .find("#" + article.id)
                .on("click", function () {
                    gbNavigatePush("details", { id: article.id });
                });
        });
    }
    if (tag == 2) {
        data = JSON.parse(decodeURIComponent(response));
        listArticle(data);
    }
    if (tag == 3) {
        article = JSON.parse(decodeURIComponent(response));
        showArticle(article);
    }
    if (tag == 4) {
        data = JSON.parse(decodeURIComponent(response));
        listComments(data);
    }
    if (tag == 5) {
        response = JSON.parse(decodeURIComponent(response));
        $("#comment-" + response.id).remove();
    }
    if (tag == 6) {
        if ($(".like-button").hasClass("fa-thumbs-up")) {
            $(".like-button")
                .addClass("fa-thumbs-o-up")
                .removeClass("fa-thumbs-up");
        } else {
            $(".like-button")
                .addClass("fa-thumbs-up")
                .removeClass("fa-thumbs-o-up");
        }
    }
    if (tag == 7) {
        response = JSON.parse(decodeURIComponent(response));
        const el = $("#comment-" + response.id + " .like-comment");
        if (el.hasClass("fa-thumbs-up")) {
            el.addClass("fa-thumbs-o-up").removeClass("fa-thumbs-up");
        } else {
            el.addClass("fa-thumbs-up").removeClass("fa-thumbs-o-up");
        }
    }
    if (tag == 8) {
        response = JSON.parse(decodeURIComponent(response));
        gbNavigatePush("details", { id: response.id });
    }
    if (tag == 9) {
        response = JSON.parse(decodeURIComponent(response));
        gbNavigatePush("details", { id: response.id });
    }
    if (tag == 10) {
        response = JSON.parse(decodeURIComponent(response));
        $('[name="age"]').val(response.age);
        $('[name="address"]').val(response.address);
        $('[name="college"]').val(response.college);
        $('[name="college_year"]').val(response.college_year);
        $('[name="crm"]').val(response.crm);
        $('[name="occupation_area"]').val(response.occupation_area);
        $('[name="specialties"]').val(response.specialties);
    }
    if (tag == 11) {
        console.log('entrou')
        response = JSON.parse(decodeURIComponent(response));
        console.log(response)
        gbNavigatePush("shift", { id: response.id });
    }
    if (tag == 12) {
        data = JSON.parse(decodeURIComponent(response));
        listShift(data);
    }
    if (tag == 13) {
        shift = JSON.parse(decodeURIComponent(response));
        showShift(shift);
    }
}

function gbDidSuccessGetUser(user) {
    if (user.constructor !== {}.constructor) {
        user = JSON.parse(user);

        console.log(user);

        if (
            $('meta[name="page"]').length > 0 &&
            $('meta[name="page"]').attr("content") == "home"
        ) {
            let data = {
                name: user.displayName,
                email: user.email,
                image: user.photoUrl,
                city: user.location,
            };

            gbRequest(
                "https://agenciamoraes.com/sites/medhelping/api/user/store",
                11,
                "NO",
                "POST",
                data
            );
        }

        if (
            $('meta[name="page"]').length > 0 &&
            $('meta[name="page"]').attr("content") == "my-data"
        ) {
            gbRequest(
                "https://agenciamoraes.com/sites/medhelping/api/user/show/" +
                    user.email,
                10
            );
        }

        if ($('input[name="user_email"]').length > 0)
            $('input[name="user_email"]').val(user.email);

        if ($('input[name="email"]').length > 0)
            $('input[name="email"]').val(user.email);

        return user;
    }
}

function showArticle(article) {
    $(document)
        .find(".article-info")
        .append(
            '<div id="' + article.id + '" class="card px-0 mb-3"></div>'
        );
    let img = article.image ? article.image : './img-fundo-min.jpg';
    $(document)
        .find("#" + article.id)
        .append('<img src="' + img + '" class="card-img-top">');
    $(document)
        .find("#" + article.id)
        .append('<div class="card-body text-center"></div>');
    $(document)
        .find(".card-body")
        .append(
            '<h5 class="card-title" style="font-size:28px">' +
                article.title +
                "</h5>"
        );
    $(document)
        .find(".card-body")
        .append(
            "<small>" +
                article.user_name +
                " em " +
                article.date +
                "</small>"
        );
    $(document)
        .find(".card-body")
        .append(
            '<p class="card-text text-left">' + article.content + "</p>"
        );

    let $postLiked = Cookies.get(`'postLiked-${article.id}`);

    $(document)
        .find(".card-body")
        .append(
            `<i class="share-button fa fa-share" style="float:left"></i>`
        );

    if ($postLiked) {
        $(document)
            .find(".card-body")
            .append(
                '<i class="like-button fa fa-thumbs-up" style="float:right"></i>'
            );
    } else {
        $(document)
            .find(".card-body")
            .append(
                '<i class="like-button fa fa-thumbs-o-up" style="float:right"></i>'
            );
    }

    $(document)
        .find(".like-button")
        .on("click", function () {
            likeButton();
        });

    $(document)
        .find(".share-button")
        .on("click", function () {
            console.log(window.location.href + '&id=' + article.id);
        });
}

function listComments(data) {
    $.each(data.comments, function (index, comment) {
        $(document)
            .find(".comments-list")
            .append(
                '<div id="comment-info-' +
                    comment.id +
                    '" class="border-bottom p-0 mt-1 pb-3"></div>'
            );
        $(document)
            .find("#comment-info-" + comment.id)
            .append(
                '<div id="comment-' +
                    comment.id +
                    '" class="mother d-flex justify-content-between align-items-center pt-3"></div>'
            );
        $(document)
            .find("#comment-" + comment.id)
            .append(
                '<div class="user-info text-center" style="max-width: 80px;"></div>'
            );
        $(document)
            .find("#comment-" + comment.id + " .user-info")
            .append(
                '<img src="' +
                    comment.user_image +
                    '" class="rounded-circle" width="40px" height="40px">'
            );
        $(document)
            .find("#comment-" + comment.id + " .user-info")
            .append('<p class="mb-0">' + comment.user_name + "</p>");
        $(document)
            .find("#comment-" + comment.id + " .user-info")
            .append(
                "<small style='font-size:12px'>" + comment.date + "</small>"
            );
        $(document)
            .find("#comment-" + comment.id)
            .append('<div class="message w-100 px-1"></div>');
        $(document)
            .find("#comment-" + comment.id + " .message")
            .append(
                "<p style='font-size: 13px'>" + comment.message + "</p>"
            );
        $(document)
            .find("#comment-" + comment.id)
            .append("<div class='buttons'></div>");

        if (comment.user_email == $('[name="user_email"]').val()) {
            $(document)
                .find("#comment-" + comment.id + " .buttons")
                .append("<i class='fa fa-trash text-danger'></i>");
            $(document)
                .find("#comment-" + comment.id + " .fa-trash")
                .on("click", function () {
                    gbRequest(
                        "https://agenciamoraes.com/sites/medhelping/api/comment/destroy/" +
                            comment.id,
                        5
                    );
                });
        } else {
            let $commentLiked = Cookies.get(`'commentLiked-${comment.id}`);
            if ($commentLiked == 1) {
                $(document)
                    .find("#comment-" + comment.id + " .buttons")
                    .append(
                        "<i id='" +
                            comment.id +
                            "' class='like-comment fa fa-thumbs-up'></i>"
                    );
            } else {
                $(document)
                    .find("#comment-" + comment.id + " .buttons")
                    .append(
                        "<i id='" +
                            comment.id +
                            "' class='like-comment fa fa-thumbs-o-up'></i>"
                    );
            }

            $(document)
                .find("#comment-" + comment.id + " .like-comment")
                .on("click", function () {
                    likeButtonComment(this.id);
                });
        }

        if (comment.replies) {
            $.each(comment.replies, (i, reply_comment) => {
                $(document)
                    .find("#comment-info-" + comment.id)
                    .append(
                        '<div id="comment-' +
                            reply_comment.id +
                            '" class="mt-1 p-3 d-flex justify-content-between align-items-center"></div>'
                    );
                $(document)
                    .find("#comment-" + reply_comment.id)
                    .append(
                        '<div class="user-info text-center" style="max-width: 80px;"></div>'
                    );
                $(document)
                    .find("#comment-" + reply_comment.id + " .user-info")
                    .append(
                        '<img src="' +
                            reply_comment.user_image +
                            '" class="rounded-circle" width="40px" height="40px">'
                    );
                $(document)
                    .find("#comment-" + reply_comment.id + " .user-info")
                    .append(
                        '<p class="mb-0">' +
                            reply_comment.user_name +
                            "</p>"
                    );
                $(document)
                    .find("#comment-" + reply_comment.id + " .user-info")
                    .append(
                        "<small style='font-size:12px'>" +
                            reply_comment.date +
                            "</small>"
                    );
                $(document)
                    .find("#comment-" + reply_comment.id)
                    .append('<div class="message w-100 px-1"></div>');
                $(document)
                    .find("#comment-" + reply_comment.id + " .message")
                    .append(
                        "<p style='font-size: 13px'>" +
                            reply_comment.message +
                            "</p>"
                    );
                $(document)
                    .find("#comment-" + reply_comment.id)
                    .append("<div class='buttons'></div>");

                if (
                    reply_comment.user_email ==
                    $('[name="user_email"]').val()
                ) {
                    $(document)
                        .find("#comment-" + reply_comment.id + " .buttons")
                        .append("<i class='fa fa-trash text-danger'></i>");
                    $(document)
                        .find("#comment-" + reply_comment.id + " .fa-trash")
                        .on("click", function () {
                            gbRequest(
                                "https://agenciamoraes.com/sites/medhelping/api/comment/destroy/" +
                                    reply_comment.id,
                                5
                            );
                        });
                } else {
                    let $commentLiked = Cookies.get(
                        `'commentLiked-${reply_comment.id}`
                    );
                    if ($commentLiked == 1) {
                        $(document)
                            .find(
                                "#comment-" + reply_comment.id + " .buttons"
                            )
                            .append(
                                "<i id='" +
                                    reply_comment.id +
                                    "' class='like-comment fa fa-thumbs-up'></i>"
                            );
                    } else {
                        $(document)
                            .find(
                                "#comment-" + reply_comment.id + " .buttons"
                            )
                            .append(
                                "<i id='" +
                                    reply_comment.id +
                                    "' class='like-comment fa fa-thumbs-o-up'></i>"
                            );
                    }

                    $(document)
                        .find(
                            "#comment-" +
                                reply_comment.id +
                                " .like-comment"
                        )
                        .on("click", function () {
                            likeButtonComment(this.id);
                        });
                }
            });
        }
        $(document).find(`#comment-info-${comment.id} .mother`).after(`
            <div class="pt-1 open-reply-${comment.id}" data-id="${comment.id}"><small style="float: right; color: #aaaaaa">Responder comentário...</small></div>
            <div id="reply-${comment.id}" class="mt-3 text-center" style="display:none">
                <form class="sendComment">
                    <input type="hidden" name="comment_id" value="${comment.id}">
                    <textarea name="message" class="form-control" placeholder="Responder comentário..."></textarea>
                    <label class="text-left w-100 mb-3" for="anonymous-${comment.id}"><input id="anonymous-${comment.id}" type="checkbox" name="anonymous"> Publicar de modo anônimo.
                            <span style="color: #888"
                                >(Não quero me identificar)</span
                            ></label>
                    <div class="text-end">
                        <button class="btn btn-dark">Enviar</button>
                    </div>
                </form>
            </div>
        `);
        $(document).on("click", `.open-reply-${comment.id}`, () => {
            let target = $(this).attr("data-id");
            $(`.open-reply-${comment.id}`).hide();
            $(`#reply-${comment.id}`).slideDown();
        });
    });

    // Insert comment
    $(document).find(".comments-list").append(`
            <div class="mt-3 text-center">
                <form class="sendComment">
                    <textarea name="message" class="form-control" placeholder="Comente no post..."></textarea>
                    <label class="text-left w-100 mb-3" for="anonymous"><input id="anonymous" type="checkbox" name="anonymous"> Publicar de modo anônimo.
                            <span style="color: #888"
                                >(Não quero me identificar)</span
                            ></label>
                    <div class="text-end">
                        <button class="btn btn-dark">Enviar</button>
                    </div>
                </form>
            </div>
        `);

    $(document).on("submit", ".sendComment", function (event) {
        $("#loader").addClass("d-flex").removeClass("d-none");
        event.preventDefault();
        var data = {};
        $.each($(this).serializeArray(), function (_, kv) {
            if (data[kv.name] != "" && data[kv.name] != null) {
                if (kv.value != "")
                    data[kv.name] = data[kv.name] += "," + kv.value;
            } else {
                data[kv.name] = kv.value;
            }
        });
        data["user_email"] = $('[name="user_email"]').val();
        data["article_id"] = $('[name="article_id"]').val();

        gbRequest(
            "https://agenciamoraes.com/sites/medhelping/api/comment/store",
            9,
            "NO",
            "POST",
            data
        );
    });
}

function listArticle(data) {
    $.each(data.articles, function (index, article) {
        $(document)
            .find(".articles-list")
            .append(
                '<div id="' +
                    article.id +
                    '" class="card px-0 my-3" style="width:50%"></div>'
            );
        let img = article.image ? article.image : './img-fundo-min.jpg';
        $(document)
            .find("#" + article.id)
            .append(
                '<img src="' + img + '" class="card-img-top">'
            );
        $(document)
            .find("#" + article.id)
            .append('<div class="card-body"></div>');
        $(document)
            .find("#" + article.id + " .card-body")
            .append(
                '<h5 class="card-title" style="font-size:28px">' +
                    article.title +
                    "</h5>"
            );
        $(document)
            .find("#" + article.id + " .card-body")
            .append(
                "<small>" +
                    article.user_name +
                    " em " +
                    article.date +
                    "</small>"
            );
        $(document)
            .find("#" + article.id)
            .on("click", function () {
                gbNavigatePush("details", { id: article.id });
            });
    });
}

function listShift(data) {
    $.each(data.shifts, function (index, shift) {
        $(document)
            .find(".shifts-list")
            .append(
                '<div id="' +
                    shift.id +
                    '" class="card px-0 my-3" style="width:50%"></div>'
            );
        let img = './img-fundo-min.jpg';
        $(document)
            .find("#" + shift.id)
            .append(
                '<img src="' + img + '" class="card-img-top">'
            );
        $(document)
            .find("#" + shift.id)
            .append('<div class="card-body"></div>');
        $(document)
            .find("#" + shift.id + " .card-body")
            .append(
                '<h5 class="card-title" style="font-size:28px">' +
                    shift.unit +
                "</h5>" +
                '<h5 class="card-title" style="font-size:20px">' +
                    shift.city +
                "</h5>"
            );
        $(document)
            .find("#" + shift.id + " .card-body")
            .append(
                "<small>" +
                    shift.user_name +
                    " em " +
                    shift.date +
                    "</small>"
            );
        $(document)
            .find("#" + shift.id)
            .on("click", function () {
                gbNavigatePush("shift", { id: shift.id });
            });
    });
}

function showShift(shift) {
    $(document)
        .find(".shift-info")
        .append(
            '<div id="' + shift.id + '" class="card px-0 mb-3"></div>'
        );
    let img = './img-fundo-min.jpg';
    $(document)
        .find("#" + shift.id)
        .append('<img src="' + img + '" class="card-img-top">');
    $(document)
        .find("#" + shift.id)
        .append('<div class="card-body text-center"></div>');
    $(document)
        .find(".card-body")
        .append(
            '<h5 class="card-title" style="font-size:28px">' +
                shift.unit +
            "</h5>" +
            '<h5 class="card-title" style="font-size:20px">' +
                shift.city +
            "</h5>"
        );
    $(document)
        .find(".card-body")
        .append(
            "<small>" +
                shift.user_name +
                " em " +
                shift.date +
                "</small><br>"
        );
    $(document)
        .find(".card-body")
        .append(
            '<p class="card-text text-left">Horário de entrada: ' + shift.entry_time + "</p>" +
            '<p class="card-text text-left">Horário de saída: ' + shift.out_time + "</p>"
        );

    if (shift.value) {
        $(document)
        .find(".card-body")
            .append(
                '<p class="card-text text-left">Valor: ' + shift.value + "</p>"
            );
    }

    if (shift.payment_method) {
        $(document)
        .find(".card-body")
            .append(
                '<p class="card-text text-left">Valor: ' + shift.payment_method + "</p>"
            );
    }

    if (shift.description) {
        $(document)
        .find(".card-body")
            .append(
                '<p class="card-text text-left">Valor: ' + shift.description + "</p>"
            );
    }
}
