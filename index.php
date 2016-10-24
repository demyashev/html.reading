<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>All files</title>
</head>
<body>
    <ol>

        <?php 

        $blacklist = array(".", '..', '.git', '.gitattributes', '.gitignore', 'index.php', 'public');

        if ($handle = opendir('.')) {

            while (false !== ($entry = readdir($handle))) {

                if (!in_array($entry, $blacklist)) {

                    echo "<li><a href=\"$entry\">$entry</a></li>";
                }
            }

            closedir($handle);
        }

        ?>
    </ol>
</body>
</html>

